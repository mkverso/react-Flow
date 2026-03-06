import { useState, useRef, useEffect, useMemo, memo, useLayoutEffect } from 'react';
import { BaseNode } from '../BaseNode';
import { useUpdateNodeInternals } from 'reactflow';
import { useTextNodeConnections } from './hooks/useTextNodeConnections';

export const TextNode = memo(({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '');
    const textareaRef = useRef(null);
    const spanRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();
    const [nodeWidth, setNodeWidth] = useState(250);

    const { rawVariables } = useTextNodeConnections({ id, currText });

    // Auto-resize logic
    useEffect(() => {
        console.log('Auto-resize logic');
        const el = spanRef.current;
        const txtref = textareaRef.current;
        if (el) {
            const textWidth = el.getBoundingClientRect().width;
            const calculatedWidth = Math.min(Math.max(textWidth + 80, 250), 320);

            const prevHeight = txtref.style.height;
            txtref.style.height = 'auto';
            const newHeight = `${txtref.scrollHeight}px`;
            txtref.style.height = newHeight;

            const sizeChanged = nodeWidth !== calculatedWidth;

            if (sizeChanged || prevHeight !== newHeight) {
                sizeChanged && setNodeWidth(calculatedWidth);
                updateNodeInternals(id);
            }
        }
    }, [currText, id, updateNodeInternals]);

    // Consolidated Handle Generation
    const handles = useMemo(() => {
        const hasVariables = rawVariables.length > 0;

        return [
            { type: 'source', pos: 'right', id: `${id}-output` },
            {
                type: 'target',
                pos: 'left',
                id: `${id}-input`,
                style: {
                    top: '50%',
                    opacity: hasVariables ? 1 : 0,
                    pointerEvents: hasVariables ? 'all' : 'none',
                    transition: 'opacity 0.2s ease-in-out'
                }
            }
        ];
    }, [id, rawVariables.length]);

    return (
        <BaseNode id={id} label="Text" handles={handles} data={data} nodeWidth={nodeWidth}>
            <div className="relative p-2 flex flex-col">
                {/* THE SPAN MIRROR */}
                <span
                    ref={spanRef}
                    className="absolute invisible text-sm border p-2"
                    style={{
                        display: 'inline-block',
                        width: 'max-content',
                        whiteSpace: 'pre',
                        fontFamily: 'inherit',
                        lineHeight: '1.25rem',
                    }}
                >
                    {/* Zero-width space ensures height works on empty lines/trailing enters */}
                    {currText.endsWith('\n') ? '\u200b' : currText || ' '}
                </span>
                <textarea
                    ref={textareaRef}
                    value={currText}
                    onChange={(e) => setCurrText(e.target.value)}
                    //onBlur={handleBlur}
                    className="node-input-field min-h-[60px] resize-none overflow-hidden border-none focus:ring-0"
                    placeholder="Enter text or {{nodeID}}..."
                />
            </div>
        </BaseNode>
    );
});

TextNode.displayName = 'TextNode';
