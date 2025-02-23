"use client";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNodeEditor } from "@/context/NodeEditorContext";
import { useRouter } from "next/navigation";
import { useAppProvider } from "@/provider/ContextProvider";
import { Node } from "@xyflow/react";

export default function Dashboard() {
    const { createProject, loadProject, setNodes, setEdges } = useNodeEditor();
    const projects = useQuery(api.projects.getProjects);
    const [newProjectName, setNewProjectName] = useState("");
    const { setCurrentTab } = useAppProvider();

    const handleCreateProject = async () => {
        if (!newProjectName.trim()) return;
        createProject(newProjectName);
        setNewProjectName(""); // Reset input after creation
    };

    const handleEditProject = (projectId: any) => {
        loadProject(projectId);
        setCurrentTab("workspace");
    };

    return (
        <div className="p-6 w-full min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-6">Projects</h1>

            {/* Create Project Input */}
            <div className="mb-8 flex gap-3 w-full max-w-md">
                <input
                    type="text"
                    className="p-2 border border-gray-600 rounded-lg w-full bg-gray-800 text-white"
                    placeholder="Enter project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                />
                <button
                    onClick={handleCreateProject}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                    Create
                </button>
            </div>

            <h3 className="text-lg font-semibold mb-4">Your Projects</h3>

            {/* Projects Grid */}
            {projects === undefined ? (
                <p>Loading projects...</p>
            ) : projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-8xl">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="p-4 rounded-lg shadow-md flex flex-col justify-between h-[220px] border border-gray-700 shadow-md shadow-gray-500"
                        >
                            {/* Project Name & Date */}
                            <div>
                                <h2 className="text-lg font-semibold truncate">{project.name}</h2>
                                <h2 className="text-lg font-semibold truncate">{project._id}</h2>
                                <p className="text-sm text-gray-400">
                                    {new Date(project.createdAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <button 
                                    className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600"
                                    onClick={() => handleEditProject(project._id)}
                                >
                                    Edit
                                </button>
                                <button className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600">
                                    Delete
                                </button>
                                <button className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600">
                                    Share
                                </button>
                                <button className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600">
                                    Deploy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
