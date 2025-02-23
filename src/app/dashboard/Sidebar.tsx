// components/layout/Sidebar.tsx
"use client";
import { useState } from "react";
import { Home, BarChart3, Settings } from "lucide-react"; // Lucide icons
import { useAppProvider } from "@/provider/ContextProvider";

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const { setCurrentTab, currentTab } = useAppProvider(); // Get tab state from context

    const tabs = [
        { name: "Home", key: "dashboard", icon: <Home size={20} /> },
        { name: "Workspace", key: "workspace", icon: <BarChart3 size={20} /> },
        { name: "Settings", key: "settings", icon: <Settings size={20} /> },
    ];

    return (
        <aside
            className={`border-r border-gray-600 shadow-xl text-white w-64 p-4 space-y-6 transition-all duration-300 ${isOpen ? "block" : "hidden"
                } sm:block`}
        >
            <h2 className="text-xl font-bold">Dashboard</h2>
            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`flex items-center gap-3 w-full text-left p-2 rounded transition ${currentTab === tab.key ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                        onClick={() => setCurrentTab(tab.key)}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
