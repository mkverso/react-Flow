// src/nodes/conditionNode.js
// ConditionNode — boolean expression gateway with True / False output branches.

import { useState, useMemo, memo } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NODE_HANDLES } from './constants/constants';

export const ConditionNode = memo(({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || '');
    const updateNodeField = useStore((s) => s.updateNodeField);

    const handles = useMemo(() => NODE_HANDLES.condition(id), [id]);

    const handleChange = (e) => {
        setCondition(e.target.value);
        updateNodeField(id, 'condition', e.target.value);
    };

    return (
        <BaseNode id={id} label="Condition" handles={handles} data={data}>
            <div className="flex flex-col gap-2">
                <label className="node-input-label">Expression</label>
                <input
                    type="text"
                    value={condition}
                    onChange={handleChange}
                    placeholder="e.g. value > 10"
                    className="node-input-field"
                />
                <div className="flex justify-end gap-3 text-[10px] font-semibold mt-1">
                    <span className="text-green-400">↑ True</span>
                    <span className="text-red-400">↓ False</span>
                </div>
            </div>
        </BaseNode>
    );
});
