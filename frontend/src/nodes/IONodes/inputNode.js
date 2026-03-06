// src/nodes/inputNode.js

import { useMemo } from 'react';
import { BaseNode } from '../BaseNode';
import { useNodeField } from './hooks/useNodeField';
import { NODE_HANDLES, INPUT_TYPES } from '../constants/constants';

export const InputNode = ({ id, data }) => {
  const [currName, setName] = useNodeField(
    id, 'inputName', data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useNodeField(
    id, 'inputType', data?.inputType || INPUT_TYPES[0]
  );

  const handles = useMemo(() => NODE_HANDLES.input(id), [id]);

  return (
    <BaseNode id={id} label="Input" handles={handles} data={data}>
      <label htmlFor={`inputName-${id}`} className="node-input-label">
        Name
        <input
          id={`inputName-${id}`}
          type="text"
          value={currName}
          onChange={(e) => setName(e.target.value)}
          className="node-input-field"
        />
      </label>
      <label htmlFor={`inputType-${id}`} className="node-input-label">
        Type
        <select
          id={`inputType-${id}`}
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="node-select-field"
        >
          {INPUT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
    </BaseNode>
  );
};
