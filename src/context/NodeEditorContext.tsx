"use client";
import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useReactFlow, useNodesState, useEdgesState, Connection, addEdge, Node, Edge } from "@xyflow/react";
import { debounce } from "lodash";
import { nodesList } from "@/constants/nodes";
import { NodeEditorContextProps } from "@/types";

const NodeEditorContext = createContext<NodeEditorContextProps | null>(null);

export function NodeEditorProvider({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<string>("Action");
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [editingName, setEditingName] = useState(false);
    const { callApi, data, loading, error, code } = useApi();
    const reactFlowInstance = useReactFlow();
    const [projectId, setProjectId] = useState<string | any>("j97ehrf200swf954yddj0a2amh7atk4m");
    const nodeDimensions = { width: 250, height: 50, margin: 10 };
    const saveProject = useMutation(api.projects.saveProject);
    const getProjects = useQuery(api.projects.getProjects);
    const [currentProject, setCurrentProject] = useState<any>(null);
    const updateProject = useMutation(api.projects.updateProject);
    const project = projectId ? useQuery(api.projects.getProjectById, { projectId }) : null;
    const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    const saveChanges = useMemo(() => debounce(async (nodes, edges) => {
        if (!projectId) return;
        console.log("Saving project changes...", { nodes, edges });
        const response = await updateProject({ projectId, nodes, edges });
        setCurrentProject(response.project);
    }, 500), [projectId, updateProject]);
    
    useEffect(() => {
        if (nodes.length > 0 || edges.length > 0) {
            saveChanges([...nodes], [...edges]); // Avoid direct state mutation reference
        }
    }, [nodes, edges]); 

    const loadProject = async (projectId: any) => {
        if (!projectId) return;
    
        try {
            setNodes([]); // Clear previous state
            setEdges([]);
            setFormData({});
            setProjectId(projectId);
            if (project) {
                setNodes(project.nodes || []);
                setEdges(project.edges || []);
                setCurrentProject(project);
            } else {
                console.warn("Project not found:", projectId);
            }
        } catch (error) {
            console.error("Error loading project:", error);
        }
    };

    useEffect(() => {
        if (project && project.nodes && project.edges) {
            setNodes(project.nodes);
            setEdges(project.edges);
            setCurrentProject(project);
        }
    }, [project]); // Only depends on project changes
    

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds) => {
                const updatedEdges = addEdge(connection, eds);
                saveChanges([...nodes], updatedEdges); 
                return updatedEdges;
            });
        },
        [setEdges, nodes, saveChanges] // Include dependencies
    );

    const handleChange = (key: string, value: string) => {
        if (!selectedNode) return;
    
        // Check if the key exists in inputs
        const updatedInputs = selectedNode.data.inputs?.map((input: any) =>
            input.key === key ? { ...input, value } : input
        ) || [];
    
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                inputs: updatedInputs,
                ...(selectedNode.data.inputs?.some((input: any) => input.key === key) ? {} : { [key]: value })
            }
        };
    
        setSelectedNode(updatedNode);
    
        setNodes((prevNodes: any) =>
            prevNodes.map((n: any) => (n.id === selectedNode.id ? updatedNode : n))
        );
    
        // Ensure changes are saved
        saveChanges(nodes, edges);
    };

    const handleSubmit = async () => {
        console.log(selectedNode?.data?.inputs);
        await callApi(selectedNode?.data?.inputs[0].value || "", selectedNode?.data?.inputs[3].value || "", selectedNode?.data?.inputs[1].value || "", selectedNode?.data?.inputs[3].value || "");
    };

    const onNodeClick = useCallback((_event: any, node: Node) => {
        setSelectedNode(node);
        const nodeType = node?.data?.type;
        setActiveTab(nodeType ? String(nodeType).charAt(0).toUpperCase() + String(nodeType).slice(1) : "Action");
    }, []);

    const deleteNode = useCallback((nodeId: string) => {
        setNodes((prevNodes) => prevNodes.filter((node: Node) => node.id !== nodeId));
        setEdges((prevEdges) => prevEdges.filter((edge: Edge) => edge.source !== nodeId && edge.target !== nodeId));
        if (selectedNode?.id === nodeId) setSelectedNode(null);
        saveChanges(nodes, edges);
    }, [setNodes, setEdges, selectedNode]);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            const nodeType = event.dataTransfer.getData("application/reactflow");
            if (!nodeType) return;
    
            const reactFlowBounds = event.currentTarget.getBoundingClientRect();
            const dropPosition = reactFlowInstance.screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left + nodeDimensions.width / 2,
                y: event.clientY - reactFlowBounds.top + nodeDimensions.height,
            });
    
            const newNode: Node = {
                id: `node_${nodes.length + 1}`,
                type: nodeType,
                data: {
                    label: nodesList[nodeType]?.name || "New Node",
                    ...nodesList[nodeType],
                },
                position: dropPosition,
            };
    
            setNodes((nds) => [...nds, newNode]);
            // Ensure changes are saved immediately
            saveChanges([...nodes, newNode], edges);
        },
        [reactFlowInstance, nodes, setNodes, saveChanges, edges]
    );

    const createProject = async (name: string) => {
        try {
            const newProject = await saveProject({ name, nodes: [], edges: [] });
            setProjectId(newProject);
            console.log("Project created:", newProject);
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };
    

    return (
        <NodeEditorContext.Provider
            value={{
                nodesList,
                activeTab,
                setActiveTab,
                selectedNode,
                setSelectedNode,
                formData,
                handleChange,
                editingName,
                setEditingName,
                handleSubmit,
                error,
                data,
                code,
                loading,
                nodes,
                setNodes,
                onNodesChange,
                edges,
                setEdges,
                onEdgesChange,
                onConnect,
                onNodeClick,
                onDrop,
                nodeDimensions,
                deleteNode,
                createProject,
                loadProject,
                currentProject,
            }}
        >
            {children}
        </NodeEditorContext.Provider>
    );
}

export function useNodeEditor() {
    const context = useContext(NodeEditorContext);
    if (!context) {
        throw new Error("useNodeEditor must be used within a NodeEditorProvider");
    }
    return context;
}

export { NodeEditorContext };
