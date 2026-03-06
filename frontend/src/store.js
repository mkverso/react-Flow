import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = createWithEqualityFn(
  devtools((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
      const newIDs = { ...get().nodeIDs };
      if (newIDs[type] === undefined) {
        newIDs[type] = 0;
      }
      newIDs[type] += 1;
      set({ nodeIDs: newIDs });
      return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
      set({
        nodes: [...get().nodes, node]
      });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } }, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, [fieldName]: fieldValue }
            };
          }

          return node;
        }),
      });
    },

    // Removes edges pointing to a TextNode whose source is no longer in activeConnections
    // activeConnections is an array of { nodeId, sourceHandle, targetHandle }
    syncTextNodeEdges: (nodeId, activeConnections) => {
      const currentEdges = get().edges;

      // get the edges that are connected to the text node
      const newEdges = currentEdges.filter((e) => {
        if (e.target !== nodeId) return true;

        // Check if the edge's source and sourceHandle are in active variables
        return activeConnections.some(v =>
          v.nodeId === e.source && v.sourceHandle === e.sourceHandle
        );
      });

      // set() if something actually changed
      if (newEdges.length !== currentEdges.length) {
        set({ edges: newEdges });
      }
    },
  }), { name: "NodeStore" })
);