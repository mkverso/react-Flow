// src/nodes/mathNode.js
// MathNode — performs arithmetic between two piped-in numeric values.

import { useState, useMemo, memo } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NODE_HANDLES, MATH_OPS } from './constants/constants';

export const MathNode = memo(({ id, data }) => {
    const [operator, setOperator] = useState(data?.operator || '+');
    const updateNodeField = useStore((s) => s.updateNodeField);

    const handles = useMemo(() => NODE_HANDLES.math(id), [id]);

    const handleOpChange = (e) => {
        setOperator(e.target.value);
        updateNodeField(id, 'operator', e.target.value);
    };

    return (
        <BaseNode id={id} label="Math" handles={handles} data={data}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span className="node-input-label">A</span>
                    <span className="node-input-label">B</span>
                </div>

                <div className="flex items-center gap-2">
                    <label className="node-input-label text-[10px]">Operator</label>
                    <select
                        value={operator}
                        onChange={handleOpChange}
                        className="node-input-field flex-1"
                    >
                        {MATH_OPS.map((op) => (
                            <option key={op} value={op}>{op}</option>
                        ))}
                    </select>
                </div>

                <div className="text-[10px] text-text-muted text-center italic">
                    A {operator} B → result
                </div>
            </div>
        </BaseNode>
    );
});
