// src/nodes/hooks/useNodeField.js
// Custom hook to manage a single node field: local state + store sync.

import { useState, useCallback } from 'react';

export const useNodeField = (id, fieldName, initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((newVal) => {
        setValue(newVal);
    }, []);

    return [value, handleChange];
};
