"use client";

import React from 'react'
import FloorEditor from '@/components/dashboard/FloorEditor'
import { useAppProvider } from '@/provider/ContextProvider';
import { ReactFlowProvider } from '@xyflow/react';
import { NodeEditorProvider } from '@/context/NodeEditorContext';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Page() {
    const {currentTab} = useAppProvider();

    return (
       
        <div className="flex-1 h-full">
            {currentTab === "dashboard" && <Dashboard />}
            {currentTab === "workspace" && <FloorEditor />}
            {currentTab === "settings" && <h1>Settings</h1>}
        </div>
    )
}
