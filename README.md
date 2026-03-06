# Vector Pipeline Builder

An advanced React-based flow editor for designing and validating data pipelines. This project features a modular architecture, high-performance state management, and a FastAPI backend for structural validation.

## 🚀 Key Features

*   **Dynamic Node System**: Includes custom nodes for LLMs, APIs, Logic, and Math, built on a robust `BaseNode` abstraction.
*   **Smart Text Nodes**: Features real-time auto-resizing and automatic handle generation/connection via `{{variable}}` syntax.
*   **Intelligent Handle Management**: Optimized handle visibility logic to prevent React Flow registration race conditions, ensuring seamless auto-connections.
*   **Integrity Checks**: Backend integration for pipeline parsing and Directed Acyclic Graph (DAG) validation to ensure pipeline validity.
*   **Modern Tech Stack**:
    *   **Frontend**: React Flow, Zustand (traditional API for optimized re-renders), Tailwind CSS.
    *   **Backend**: Python, FastAPI, Pydantic.

## 📁 Project Structure

```text
├── frontend/           # React application (UI and Flow Logic)
├── backend/            # FastAPI application (DAG validation)
└── README.md           # Project documentation
```

## 🛠️ Getting Started

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   python main.py
   ```

## 🔗 GitHub Repository
The source code is hosted at: [https://github.com/mkverso/react-Flow.git](https://github.com/mkverso/react-Flow.git)
