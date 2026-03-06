import { useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { NODE_HANDLES } from './constants/constants';

export const LLMNode = ({ id, data }) => {
  const handles = useMemo(() => NODE_HANDLES.llm(id), [id]);

  return (
    <BaseNode id={id} label="LLM" handles={handles} data={data}>
      <div className="flex flex-col gap-2 text-xs text-text-secondary">
        <div className="flex items-center justify-between">
          <span className="text-text-muted uppercase tracking-wider text-[10px]">Model</span>
          <span className="font-medium text-primary">GPT-4</span>
        </div>
        <div className="border-t border-border-custom pt-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue/70 shrink-0"></span>
            <span className="text-text-muted">System Prompt</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/70 shrink-0"></span>
            <span className="text-text-muted">User Prompt</span>
          </div>
        </div>
        <div className="border-t border-border-custom pt-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400/70 shrink-0"></span>
          <span className="text-text-muted">Response →</span>
        </div>
      </div>
    </BaseNode>
  );
};
