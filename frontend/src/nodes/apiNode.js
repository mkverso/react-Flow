// src/nodes/apiNode.js
// APINode — configures an HTTP request with method and URL.

import { useState, useMemo, memo } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NODE_HANDLES, HTTP_METHODS } from './constants/constants';

export const APINode = memo(({ id, data }) => {
    const [url, setUrl] = useState(data?.url || '');
    const [method, setMethod] = useState(data?.method || 'GET');
    const updateNodeField = useStore((s) => s.updateNodeField);

    const handles = useMemo(() => NODE_HANDLES.api(id), [id]);

    const onUrl = (e) => {
        setUrl(e.target.value);
        updateNodeField(id, 'url', e.target.value);
    };

    const onMethod = (e) => {
        setMethod(e.target.value);
        updateNodeField(id, 'method', e.target.value);
    };

    return (
        <BaseNode id={id} label="API" handles={handles} data={data}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <select
                        value={method}
                        onChange={onMethod}
                        className="node-input-field w-[70px] shrink-0"
                    >
                        {HTTP_METHODS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <label className="node-input-label">URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={onUrl}
                    placeholder="https://api.example.com/endpoint"
                    className="node-input-field"
                />

                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                    <span>← Body (optional)</span>
                    <span>Response →</span>
                </div>
            </div>
        </BaseNode>
    );
});
