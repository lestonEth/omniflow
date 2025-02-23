import { useContext } from "react";
import { NodeEditorContext } from "@/context/NodeEditorContext";

export function useNodeEditor() {
    const context = useContext(NodeEditorContext);
    if (!context) {
        throw new Error("useNodeEditor must be used within a NodeEditorProvider");
    }
    return context;
}
