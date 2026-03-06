// submit.js
import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);

    const { nodes, edges } = useStore((s) => ({ nodes: s.nodes, edges: s.edges }));

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            alert(
                `Pipeline Analysis:\n` +
                `- Nodes: ${data.num_nodes}\n` +
                `- Edges: ${data.num_edges}\n` +
                `- Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
            );

        } catch (error) {
            console.error('Submission failed:', error);
            alert('Error: Could not analyze the pipeline. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-wrapper">
            <button
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading || nodes.length === 0}
            >
                {loading ? (
                    <>
                        <svg className="submit-spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" strokeLinecap="round" />
                        </svg>
                        Running…
                    </>
                ) : (
                    <>
                        Submit
                    </>
                )}
            </button>
        </div>
    );
};
