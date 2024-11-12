const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

function topologicalSort(graph) {
    const inDegree = {};  
    const queue = [];     
    const order = [];     

    // Passo 1: Inicializar o grau de entrada para todos os nós
    for (const node in graph) {
        inDegree[node] = inDegree[node] || 0;  // Garante que cada nó tenha grau inicial
        for (const neighbor of graph[node]) {
            inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
        }
    }

    // Passo 2: Adicionar à fila todos os nós com grau de entrada zero
    for (const node in inDegree) {
        if (inDegree[node] === 0) queue.push(node);
    }

    // Passo 3: Processar a fila e construir a ordem topológica
    while (queue.length > 0) {
        const current = queue.shift();
        order.push(current);

        // Reduzir o grau de entrada de cada dependente
        if (graph[current]) {
            for (const neighbor of graph[current]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }

    // Verificar se todos os nós foram processados para detectar ciclos
    if (order.length !== Object.keys(inDegree).length) {
        return "Ciclo detectado! O grafo não é ordenável";
    }

    return order;
}

app.post('/sort', (req, res) => {
    const { graph } = req.body;

    console.log("Grafo recebido no backend:", graph);

    if (typeof graph !== 'object' || graph === null) {
        return res.status(400).json({ error: "Grafo inválido: deve ser um objeto." });
    }

    try {
        const correctOrder = topologicalSort(graph);
        console.log("Ordem correta calculada:", correctOrder);

        const incorrectIndices = Object.keys(graph).map((node, index) =>
            correctOrder[index] !== node ? index : -1
        ).filter(index => index !== -1);

        res.json({ order: correctOrder, incorrectIndices });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
