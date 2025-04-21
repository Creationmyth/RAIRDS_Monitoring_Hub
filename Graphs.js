function createGraph() {
    const edges = {};
    const nodes = [];
    function addNode(node) {
        nodes.push(node);
        edges[node] = [];
    }
    function addEdge(node1, node2) {
        edges[node1].push(node2);
        edges[node2].push(node1);
    }
    function addDirectedEdge(node1, node2) {
        edges[node1].push(node2);
    }
    function display() {
        let graph = "";
        nodes.forEach(node => {
            graph += node + "->" + edges[node].join(", ") + "\n";
        });
        console.log(graph);
    }
    return {
        addNode,
        addEdge,
        addDirectedEdge,
        display,
    };
}

