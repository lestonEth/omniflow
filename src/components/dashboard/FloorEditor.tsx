import React from 'react';
import WorkSpace from './WorkSpace';
import NodeSidebar from './NodeSidebar';
import { ReactFlowProvider } from "@xyflow/react";
import { NodeEditorProvider } from '@/context/NodeEditorContext';

export default function FloorEditor() {
    return (
        <div className="flex flex-1 h-full">
            <WorkSpace />
            <NodeSidebar />
        </div>
    )
}
