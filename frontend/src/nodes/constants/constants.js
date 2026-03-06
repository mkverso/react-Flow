// src/nodes/constants/constants.js
// Shared constants for all node types — avoids magic strings across components.



export const handleMap = {
    customInput: ['value'],
    llm: ['response'],
    text: ['output'],
    math: ['result'],
    api: ['response'],
    merge: ['output'],
    condition: ['true', 'false'], // Added both output options
};

export const INPUT_TYPES = ['Text', 'File'];
export const OUTPUT_TYPES = ['Text', 'Image'];
export const MATH_OPS = ['+', '−', '×', '÷'];
export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

/**
 * NODE_HANDLES — returns the complete handles array for each node type.
 */
export const NODE_HANDLES = {
    input: (id) => [
        { type: 'source', pos: 'right', id: `${id}-value` },
    ],
    output: (id) => [
        { type: 'target', pos: 'left', id: `${id}-value` },
    ],
    llm: (id) => [
        { type: 'target', pos: 'left', id: `${id}-system`, style: { top: '33%' } },
        { type: 'target', pos: 'left', id: `${id}-prompt`, style: { top: '66%' } },
        { type: 'source', pos: 'right', id: `${id}-response` },
    ],
    text: (id) => [
        { type: 'source', pos: 'right', id: `${id}-output` },
    ],
    // Note has no handles — annotation only
    //note: () => [],
    math: (id) => [
        { type: 'target', pos: 'left', id: `${id}-a`, style: { top: '35%' } },
        { type: 'target', pos: 'left', id: `${id}-b`, style: { top: '65%' } },
        { type: 'source', pos: 'right', id: `${id}-result` },
    ],
    condition: (id) => [
        { type: 'target', pos: 'left', id: `${id}-input` },
        { type: 'source', pos: 'right', id: `${id}-true`, style: { top: '35%' } },
        { type: 'source', pos: 'right', id: `${id}-false`, style: { top: '65%' } },
    ],
    api: (id) => [
        { type: 'target', pos: 'left', id: `${id}-body` },
        { type: 'source', pos: 'right', id: `${id}-response` },
    ],
    merge: (id) => [
        { type: 'target', pos: 'left', id: `${id}-a`, style: { top: '35%' } },
        { type: 'target', pos: 'left', id: `${id}-b`, style: { top: '65%' } },
        { type: 'source', pos: 'right', id: `${id}-output` },
    ],
};

export const TOOLBAR_NODES = [
    { type: 'customInput', label: 'Input', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg> },
    { type: 'customOutput', label: 'Output', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg> },
    { type: 'text', label: 'Text', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
    { type: 'llm', label: 'LLM', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /><path d="M7 12h10" /></svg> },
    { type: 'note', label: 'Note', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg> },
    { type: 'math', label: 'Math', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> },
    { type: 'condition', label: 'If / Else', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
    { type: 'api', label: 'API', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" /></svg> },
    { type: 'merge', label: 'Merge', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="16" y2="12" /><line x1="8" y1="18" x2="16" y2="12" /><circle cx="16" cy="12" r="2" /></svg> },
];
