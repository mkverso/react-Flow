import { DraggableNode } from './draggableNode';
import { TOOLBAR_NODES } from './nodes/constants/constants';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar-container">
            {TOOLBAR_NODES.map((node) => (
                <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                    icon={node.icon}
                />
            ))}
        </div>
    );
};
