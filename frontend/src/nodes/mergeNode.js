// src/nodes/mergeNode.js
// MergeNode — joins two text inputs with a configurable separator.

import { useState, useMemo, memo } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NODE_HANDLES } from './constants/constants';

export const MergeNode = memo(({ id, data }) => {
    const [separator, setSeparator] = useState(data?.separator ?? ' ');
    const updateNodeField = useStore((s) => s.updateNodeField);

    const handles = useMemo(() => NODE_HANDLES.merge(id), [id]);

    const handleChange = (e) => {
        setSeparator(e.target.value);
        updateNodeField(id, 'separator', e.target.value);
    };

    return (
        <BaseNode id={id} label="Merge" handles={handles} data={data}>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] text-text-muted">
                    <span>A ↗</span>
                    <span>↘ B</span>
                </div>

                <label className="node-input-label">Separator</label>
                <input
                    type="text"
                    value={separator}
                    onChange={handleChange}
                    placeholder="space, comma, newline..."
                    className="node-input-field"
                />

                <div className="text-[10px] text-text-muted text-center italic">
                    A + separator + B → output
                </div>
            </div>
        </BaseNode>
    );
});
