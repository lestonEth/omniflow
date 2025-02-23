import React from "react";
import { useNodeEditor } from "@/hooks/useNodeEditor";

export default function Tooltip({ isOpen }: { isOpen: boolean;}) {
    if (!isOpen) return null;
    const { deleteNode, selectedNode } = useNodeEditor();

    const list = ["Copy", "Delete", "Lock"];

    return (
        <div className="bg-background border border-gray-600 rounded-md px-2 py-1 absolute right-0 translate-y-[-60px] shadow-lg flex ">
            {list.map((menu, index) => (
                <button
                    key={index}
                    className="menu-item text-xs text-white hover:bg-gray-700 py-1 px-2 rounded-md transition-all"
                    onClick={() => {
                        if (menu === "Delete" && typeof deleteNode === 'function') {
                            deleteNode(selectedNode?.id);
                        }
                    }}
                >
                    {menu}
                </button>
            ))}
        </div>
    );
}
