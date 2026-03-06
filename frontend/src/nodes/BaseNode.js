// src/nodes/BaseNode.js

import { Handle, Position } from 'reactflow';

// Mapping string names to React Flow Position constants
const POSITION_MAP = {
    left: Position.Left,
    right: Position.Right,
    top: Position.Top,
    bottom: Position.Bottom,
};

export const BaseNode = ({ id, label, children, handles, style, nodeWidth }) => {
    return (
        <div className="node-container" style={{ minWidth: `${nodeWidth || 200}px`, ...style }}>
            <div className="node-header group">
                {/* Node Title */}
                <span className="node-header-title group-hover:text-primary">
                    {label}
                </span>
                <div className="node-indicator"></div>
            </div>

            <div className="node-id">
                {id}
            </div>

            {/* Custom Content Slot */}
            <div className="node-content">
                {children}
            </div>

            {/* Handle Management */}
            {handles && handles.map((h, i) => (
                <Handle
                    key={`${id}-h-${i}`}
                    type={h.type}
                    position={POSITION_MAP[h.pos] || Position.Left}
                    id={h.id}
                    style={h.style}
                    className="node-handle"
                />
            ))}
        </div>
    );
};
