// src/nodes/outputNode.js

import { useMemo } from 'react';
import { BaseNode } from '../BaseNode';
import { useNodeField } from './hooks/useNodeField';
import { NODE_HANDLES, OUTPUT_TYPES } from '../constants/constants';

export const OutputNode = ({ id, data }) => {
  const [currName, setName] = useNodeField(
    id, 'outputName', data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useNodeField(
    id, 'outputType', data?.outputType || OUTPUT_TYPES[0]
  );

  const handles = useMemo(() => NODE_HANDLES.output(id), [id]);

  return (
    <BaseNode id={id} label="Output" handles={handles} data={data}>
      <label htmlFor={`outputName-${id}`} className="node-input-label">
        Name
        <input
          id={`outputName-${id}`}
          type="text"
          value={currName}
          onChange={(e) => setName(e.target.value)}
          className="node-input-field"
        />
      </label>
      <label htmlFor={`outputType-${id}`} className="node-input-label">
        Type
        <select
          id={`outputType-${id}`}
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          className="node-select-field"
        >
          {OUTPUT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
    </BaseNode>
  );
};
