# Store.js - State Management Explanation

The `store.js` file is the "brain" of the frontend. It uses **Zustand** to manage the state of the pipeline, specifically tracking which nodes exist, where they are, and how they are connected.

## 1. Core State
The store maintains two main arrays:
- **`nodes`**: An array of all node objects currently on the canvas.
- **`edges`**: An array of all connection lines between those nodes.

---

## 2. Key Functions (Actions)

### `getNodeID(type)` (Line 14)
This function ensures every node has a unique ID.
- **Logic**: it keeps a counter for each node type (like `input`, `llm`, `text`).
- **Result**: If you add two Input nodes, they get IDs like `customInput-1` and `customInput-2`.

### `addNode(node)` (Line 23)
This is called when a user drops a new node onto the canvas. It simply appends the new node to the existing `nodes` array.

### `onNodesChange(changes)` (Line 28)
This is a standard **React Flow** callback. 
- **Purpose**: Whenever a node is moved, selected, or deleted, React Flow tracks those "changes."
- **Action**: This function applies those changes to our Zustand state so the UI stays in sync with your mouse movements.

### `onEdgesChange(changes)` (Line 33)
Similar to `onNodesChange`, but for the connecting lines (edges). It handles selecting or deleting connection lines.

### `onConnect(connection)` (Line 38)
This function is triggered when you drag a line from one node's handle to another.
- **Custom Styling**: It automatically adds specific styles to the new connection:
    - `type: 'smoothstep'`: Makes the line curved rather than a straight diagonal.
    - `animated: true`: Makes the line look like it's "flowing."
    - `markerEnd`: Adds an arrow head to the end of the line.

### `updateNodeField(nodeId, fieldName, fieldValue)` (Line 43)
A helper function used to change data *inside* a node.
- **Example**: When you type in a Text Node, this function is called to update the `text` field specifically for that node's ID without affecting other nodes.

---

## 3. Why This Approach?
By using `useStore`, any component in the app (the Toolbar, the Canvas, or the Submit Button) can "subscribe" to the nodes and edges. This ensures that the whole app is always looking at the same information.
