import { Node, Edge } from "@xyflow/react";

export interface NodeEditorContextProps {
    nodesList: Record<string, any>;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    selectedNode: Node | null;
    setSelectedNode: (node: Node | null) => void;
    formData: Record<string, any>;
    handleChange: (key: string, value: string) => void;
    editingName: boolean;
    setEditingName: (editing: boolean) => void;
    handleSubmit: () => Promise<void>;
    error: any;
    data: any;
    code: any;
    loading: boolean;
    nodes: Node[];
    setNodes: (nodes: Node[]) => void;
    onNodesChange: any;
    edges: Edge[];
    setEdges: (edges: Edge[]) => void;
    onEdgesChange: any;
    onConnect: (connection: any) => void;
    onNodeClick: (event: any, node: Node) => void;
    onDrop: (event: React.DragEvent) => void;
    nodeDimensions: NodeDimensionsProps;
    deleteNode: (nodeId: string) => void;
    createProject: (name: string) => void;
    loadProject: (projectId: any) => void;
    currentProject: any;
}


export interface NodeDimensionsProps{
    width: number; height: number; margin: number 
}