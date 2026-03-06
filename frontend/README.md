# Vector Pipeline Builder

An advanced React-based flow editor for designing data pipelines. This project focuses on a modular architecture, high-performance state management, and intelligent node interactions.

## Key Features

*   **Dynamic Node System**: Includes custom nodes for LLMs, APIs, Logic, and Math, built on a robust `BaseNode` abstraction.
*   **Smart Text Nodes**: Features real-time auto-resizing (adjusting both width and height) and automatic handle generation/connection via `{{variable}}` syntax.
*   **Intelligent Handle Management**: Handles are rendered with optimized visibility logic to prevent React Flow registration race conditions, ensuring seamless auto-connections.
*   **Integrity Checks**: Backend integration for pipeline parsing and Directed Acyclic Graph (DAG) validation to ensure pipeline validity.
*   **Modern Tech Stack**:
    *   **React Flow**: For the interactive node-based UI.
    *   **Zustand**: Using `zustand/traditional` with high-performance equality checks (`shallow`) for optimized re-renders.
    *   **Tailwind CSS**: For a premium, modern aesthetic.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
