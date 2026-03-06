import { useEffect, useMemo } from 'react';
import { useStore } from '../../../store';
import { handleMap } from '../../constants/constants';

export const useTextNodeConnections = ({ id, currText }) => {
    const nodes = useStore((s) => s.nodes);
    const edges = useStore((s) => s.edges);
    const onConnect = useStore((s) => s.onConnect);
    const syncTextNodeEdges = useStore((s) => s.syncTextNodeEdges);


    const getMatchesString = useMemo(() => {
        // Extracts matches and converts the array to a JSON string
        return JSON.stringify([...currText.matchAll(/\{\{([^.}]+)(?:\.([^}]+))?\}\}/g)]);
    }, [currText]);

    // 1. Variable Extraction & Validation
    const rawVariablesString = useMemo(() => {
        let matches = JSON.parse(getMatchesString);
        if (matches.length === 0) return JSON.stringify([]);
        const targetHandle = `${id}-input`;

        const nodeMap = new Map(nodes.map(n => [n.id, n]));

        const result = [];

        for (const match of matches) {
            const nodeId = match[1]?.trim();
            const handleId = match[2]?.trim();

            if (!nodeId) continue;
            const sourceNode = nodeMap.get(nodeId);
            if (!sourceNode) continue;

            const availableHandles = handleMap[sourceNode.type];
            if (!availableHandles?.length) continue;

            const finalHandleId = handleId && availableHandles.includes(handleId)
                ? handleId
                : availableHandles[0];

            result.push({
                nodeId,
                sourceHandle: `${nodeId}-${finalHandleId}`,
                targetHandle,
            });
        }

        return JSON.stringify(result);
    }, [getMatchesString, id, nodes]);

    const rawVariables = useMemo(() => JSON.parse(rawVariablesString), [rawVariablesString]);

    // 2. Edge Syncing (Cleanup)
    useEffect(() => {
        if (syncTextNodeEdges) {
            syncTextNodeEdges(id, rawVariables);
            console.log('Edge Syncing');
        }
    }, [id, rawVariables, syncTextNodeEdges]);

    // 3. Auto-Connection Logic
    useEffect(() => {
        console.log('Auto-Connection Logic');
        rawVariables.forEach(v => {
            const edgeExists = edges.some(e =>
                e.source === v.nodeId &&
                e.sourceHandle === v.sourceHandle &&
                e.target === id &&
                e.targetHandle === v.targetHandle
            );

            if (!edgeExists) {
                setTimeout(() => {
                    onConnect({
                        source: v.nodeId,
                        sourceHandle: v.sourceHandle,
                        target: id,
                        targetHandle: v.targetHandle
                    });
                }, 50);
            }
        });
    }, [id, rawVariables, onConnect, edges]);

    return { rawVariables };
};
