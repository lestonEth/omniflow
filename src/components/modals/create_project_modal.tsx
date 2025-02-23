"use client";
import React, { useState } from "react";
import { useNodeEditor } from "@/hooks/useNodeEditor";

interface  ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (projectName: string) => void;
}

const ProjectModal = ({ isOpen, onClose, onCreate } : ProjectModalProps) => {
    const [projectName, setProjectName] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-background border border-gray-500 rounded-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Create New Project</h2>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4 bg-background"
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            onCreate(projectName);
                            setProjectName("");
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
