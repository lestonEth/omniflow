"use client";
import React, { useState } from "react";
import {
    ReactFlow,
    Background,
    addEdge,
    Connection,
    Edge,
    useNodesState,
    useEdgesState
} from "@xyflow/react";
import NodeSidebar from "./NodeSidebar";
import "@xyflow/react/dist/style.css";
import CustomNode from "../custom_widgets/CustomNode";
import { useNodeEditor } from "@/hooks/useNodeEditor";
import ProjectModal from "../modals/create_project_modal";
import { useAppProvider } from "@/provider/ContextProvider";

const nodeTypes = { Action: CustomNode, Memory: CustomNode, Condition: CustomNode, Event: CustomNode}

export default function WorkSpace() {
    const {
        activeTab,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        onEdgesChange,
        onConnect,
        selectedNode,
        onNodeClick,
        onDrop,
        createProject,
        currentProject,
    } = useNodeEditor();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showToast } = useAppProvider();

    const handleCreateProject = (name: string) => {
        try {
            createProject(name);
            showToast("Project created successfully", "success");
        } catch (error) {
            console.error("Error creating project:", error);
            showToast("Error creating project", "error");
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex-1 p-6 relative">
            {currentProject ?
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                    snapToGrid
                    connectionLineStyle={{ stroke: "#ddd" }}
                    snapGrid={[16, 16]}
                    viewport={{ x: 0, y: 0, zoom: 1 }}
                    onDrop={onDrop}
                    onDragOver={(event) => event.preventDefault()}
                >
                    <Background color="#444" gap={16} />
                </ReactFlow>
            : 
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-lg">Select a project to start working</p>
                </div>
            }

            {!currentProject ? (
                <button
                    className="bg-background text-white px-4 py-2 mb-4 rounded-md absolute top-6 left-6 border border-gray-500 rounded-lg hover:bg-gray-500 absolute left-6 top-6"
                    onClick={() => setIsModalOpen(true)}
                >
                    New Project
                </button>
            ) :
                <div className="absolute top-6 left-6 border border-gray-500 rounded-lg p-6 bg-background">
                    <p className="text-sm font-bold mb-6 text-gray-400"><b className="text-gray-100">Project Name: </b>{currentProject.name}</p>
                    <p className="text-sm font-bold mb-6 text-gray-400"><b className="text-gray-100">Project id: </b>{currentProject._id.substring(0, 18)}...</p>
                    <p className="text-sm font-bold mb-6 text-gray-400"><b className="text-gray-100">Nodes: </b>{currentProject.nodes.length}</p>
                    <p className="text-sm font-bold mb-6 text-gray-400"><b className="text-gray-100">Edges: </b>{currentProject.edges.length}</p>
                </div>
            }

            <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProject} />
        </div>
    );
}
