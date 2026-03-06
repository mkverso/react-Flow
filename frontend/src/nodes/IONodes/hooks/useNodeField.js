// src/nodes/hooks/useNodeField.js
// Custom hook to manage a single node field: local state + store sync.

import { useState, useCallback } from 'react';
import { useStore } from '../../../store';

export const useNodeField = (id, fieldName, initialValue) => {
    const [value, setValue] = useState(initialValue);
    //const updateNodeField = useStore((state) => state.updateNodeField);

    const handleChange = useCallback((newVal) => {
        setValue(newVal);
        //updateNodeField(id, fieldName, newVal);
    }, [id, fieldName]);

    return [value, handleChange];
};
