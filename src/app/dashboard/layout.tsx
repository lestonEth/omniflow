// components/layout/DashboardLayout.tsx
"use client";
import { useState, ReactNode } from "react";
import { ConvexClientProvider } from "@/provider/ConvexClientProvider";
import { ContextProvider } from "@/provider/ContextProvider";
import { NodeEditorProvider } from "@/context/NodeEditorContext";
import { ReactFlowProvider } from "@xyflow/react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

    return (
        <ConvexClientProvider>
            <ContextProvider>
                <ReactFlowProvider>
                    <NodeEditorProvider>
                        <div className="flex h-screen bg-background overflow-hidden">
                            <Sidebar isOpen={isSidebarOpen} />
                            <div className="flex flex-col flex-1">
                                <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                                <main className="flex-1">{children}</main>
                            </div>
                        </div>
                    </NodeEditorProvider>
                </ReactFlowProvider>
            </ContextProvider>
        </ConvexClientProvider>
    );
}
