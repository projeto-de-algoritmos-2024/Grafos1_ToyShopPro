import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType
} from 'react-flow-renderer';
import axios from 'axios';

const initialNodes = [
  { id: 'chassi', data: { label: 'Chassi' }, position: { x: 100, y: 0 } },
  { id: 'motor', data: { label: 'Motor' }, position: { x: 200, y: 100 } },
  { id: 'transmissao', data: { label: 'Transmissão' }, position: { x: 300, y: 200 } },
  { id: 'carroceria', data: { label: 'Carroceria' }, position: { x: 400, y: 100 } },
  { id: 'rodas', data: { label: 'Rodas' }, position: { x: 500, y: 200 } },
  { id: 'pintura', data: { label: 'Pintura' }, position: { x: 600, y: 100 } },
  { id: 'inspecao', data: { label: 'Inspeção' }, position: { x: 700, y: 0 } }
];

const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [incorrectNodes, setIncorrectNodes] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);

  const handleSubmitOrder = async () => {
    const graph = nodes.reduce((acc, node) => {
      acc[node.id] = edges
        .filter((edge) => edge.source === node.id)
        .map((edge) => edge.target);
      return acc;
    }, {});

    console.log("Grafo enviado ao backend:", { graph });

    try {
      const response = await axios.post('http://localhost:5000/sort', { graph });
      setCorrectOrder(response.data.order || response.data.message);
      setIncorrectNodes(response.data.incorrectIndices || []);
    } catch (error) {
      console.error("Erro ao verificar a ordem:", error.response?.data || error.message);
    }
  };

  const handleConnect = (params) => {
    setEdges((eds) =>
      addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
    );
  };

  const handleEdgeClick = (event, edge) => {
    event.stopPropagation();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  return (
    <div style={{ height: '90vh', width: '100%', margin: '20px' }}>
      <h1>Ordem de Produção com Dependências</h1>
      <p>Arraste os itens e clique em "Verificar Ordem" para validar as dependências.</p>

      <button onClick={handleSubmitOrder} style={{ marginTop: '16px', backgroundColor: '#0094bb', border: 'none', padding: '10px', borderRadius: '10px', color: '#ffffff' }}>
        Verificar Ordem
      </button>

      {typeof correctOrder === "string" ? (
        <div style={{ marginTop: '16px', color: 'red' }}>
          <h3>{correctOrder}</h3>
        </div>
      ) : (
        correctOrder.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h3>Ordem Correta Sugerida:</h3>
            <p>
              {correctOrder.join(' -> ')}
            </p>
          </div>

        )
      )}

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: incorrectNodes.includes(node.id)
            ? { backgroundColor: 'red', color: 'white', fontWeight: 'bold' }
            : { backgroundColor: 'lightgray', color: 'black' }
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onEdgeClick={handleEdgeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default App;
