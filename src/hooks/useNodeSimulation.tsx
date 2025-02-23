import { useState, useEffect } from "react";
interface NodeData {
    type?: string;
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    expression?: string;
}

interface Node {
    id: string;
    type: "Action" | "Condition" | "Event" | "Memory";
    data: NodeData;
}

interface Edge {
    source: string;
    target: string;
}

interface NodeResults {
    [key: string]: any;
}

const useNodeSimulation = (nodes: Node[], edges: Edge[]) => {
    const [results, setResults] = useState<NodeResults>({});
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const executeNode = async (
        node: Node,
        nodes: Node[],
        edges: Edge[],
        results: NodeResults
    ): Promise<any> => {
        switch (node.type) {
            case "Action": {
                const { method = "GET", headers = {}, body } = node.data;
                const url = node.data?.inputs[0]?.value;
                console.log("Calling API with:", url, method)
                if (!url) return;
                try {
                    const response = await fetch(url, {
                        method,
                        headers,
                        body: method !== "GET" ? JSON.stringify(body) : null,
                    });

                    const responseData = await response.json();
                    const status = response.status;

                    results[node.id] = { response: responseData, status };
                    return { response: responseData, status };
                } catch (error) {
                    console.error("API Call Failed:", error);
                    return { response: null, status: 500 };
                }
            }

            case "Condition": {
                const sourceNode = nodes.find((n) =>
                    edges.some((e) => e.source === n.id && e.target === node.id)
                );
                console.log("Source Node:", sourceNode);
                if (!sourceNode || !results[sourceNode.id]) return;

                const status = results[sourceNode.id].status;
                console.log("Status:", status);
                console.log(node.data);
                if (!node.data.inputs[0].key==="expression") return;

                const expression = node.data.inputs[0]?.value.replace("status", status.toString());
                console.log("Expression:", expression);
                const result = eval(expression);
                results[node.id] = { result };
                console.log("Condition Result:", result);
                return { result };
            }

            case "Event": {
                const triggered = true;
                results[node.id] = { triggered };
                return { triggered };
            }

            case "Memory": {
                const sourceNode = nodes.find((n) =>
                    edges.some((e) => e.source === n.id && e.target === node.id)
                );
                if (!sourceNode || !results[sourceNode.id]) return;

                const value = results[sourceNode.id];
                results[node.id] = { value };
                return { value };
            }

            default:
                console.warn("Unknown node type:", node.type);
                return null;
        }
    };

    
    const runSimulation = async () => {
        setIsRunning(true);
        let tempResults: NodeResults = {};

        const sortedNodes = [...nodes].sort((a, b) => {
            const aIncoming = edges.filter((e) => e.target === a.id).length;
            const bIncoming = edges.filter((e) => e.target === b.id).length;
            return aIncoming - bIncoming;
        });
        console.log("########## STARTED RUNNING ANIMATION ###################")
        for (const node of sortedNodes) {
            await executeNode(node, nodes, edges, tempResults);
        }
        console.log("########## ENDED RUNNING ANIMATION ###################")


        setResults(tempResults);
        setIsRunning(false);
    };

    useEffect(() => {
        runSimulation();
    }, [nodes, edges]);

    return { results, isRunning, runSimulation };
};

export default useNodeSimulation;
