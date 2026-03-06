from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Node Parser API'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    parsed_data = json.loads(pipeline)
    nodes = parsed_data.get('nodes', [])
    edges = parsed_data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Adjacency List and Calculate In-Degrees
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    
    # Build the adjacency list and compute in-degrees for each node based on the edges
    for edge in edges:
        u = edge['source']
        v = edge['target']
        if v in adj:  # Safety check
            adj[u].append(v)
            in_degree[v] += 1

    # Kahn's Algorithm for DAG detection
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    visited_count = 0
    
    while queue:
        u = queue.popleft()
        visited_count += 1
        
        for v in adj.get(u, []):
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    # If visited_count == num_nodes, it's a DAG
    is_dag = (visited_count == num_nodes)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
