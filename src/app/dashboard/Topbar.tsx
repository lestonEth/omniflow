import { Menu, X, PlayCircle, File } from "lucide-react";
import { useNodeEditor } from "@/context/NodeEditorContext";
import useNodeSimulation from "@/hooks/useNodeSimulation";

interface TopbarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Topbar({ isSidebarOpen, toggleSidebar }: TopbarProps) {
    const { nodes, edges } = useNodeEditor();   
    const { isRunning, runSimulation } = useNodeSimulation(nodes, edges);

    return (
        <header className="shadow-md px-4 py-3 flex justify-between items-center border-b border-gray-600">
            {/* Sidebar Toggle Button */}
            <button className="sm:hidden p-2" onClick={toggleSidebar}>
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Welcome Text */}
            <span className="text-gray-400">Welcome, Jimleston Osoi</span>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
                <button className="px-3 py-1 border border-gray-500 rounded-lg text-sm hover:bg-gray-600 flex gap-2 items-center">
                    <File size={16} /> Export Flow
                </button>
                <button 
                    className="px-3 py-1 border border-gray-500 rounded-lg text-sm hover:bg-gray-600 flex gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={runSimulation}
                    disabled={isRunning} // Disable button while running
                >
                    <PlayCircle size={16} /> {isRunning ? "Running..." : "Run Flow"}
                </button>
            </div>
        </header>
    );
}
