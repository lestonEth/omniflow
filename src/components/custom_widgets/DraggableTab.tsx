import React from 'react';

interface DraggableTabProps {
    tab: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function DraggableTab({ tab, activeTab, setActiveTab } : DraggableTabProps) {
    const handleDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };
    return (
        <li
            key={tab}
            className={`tab-item text-xs cursor-pointer px-3 py-2 rounded-md w-1/4 ${
                activeTab === tab ? "bg-gray-700 font-bold" : "hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(tab)}
            draggable
            onDragStart={(event) => handleDragStart(event, tab)}
        >
            {tab}
        </li>
    )
}
