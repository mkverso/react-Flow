// src/nodes/noteNode.js
// NoteNode — annotation-only sticky note, no pipeline handles.

import { useState, memo } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const NoteNode = memo(({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || 'Write a note...');
    const updateNodeField = useStore((s) => s.updateNodeField);

    const handleChange = (e) => {
        setCurrText(e.target.value);
        updateNodeField(id, 'text', e.target.value);
    };

    return (
        <BaseNode id={id} label="Note" handles={[]} data={data} style={{ width: 200 }}>
            <textarea
                value={currText}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent text-text-primary text-[12px] resize-none outline-none placeholder:text-text-muted"
                placeholder="Write a note..."
            />
        </BaseNode>
    );
});
