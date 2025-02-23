import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Power, MenuIcon } from "lucide-react";
import Tooltip from "./Tooltip";
import { useNodeEditor } from "@/hooks/useNodeEditor";
import { NodeDimensionsProps } from "@/types";

interface CustomNodeProps {
    data: {
        label: string;
        description: string;
    };
}

const CustomNode = ({ data } : CustomNodeProps) => {
    const [isOpenTooltip, setIsOpenTooltip] = React.useState<boolean>(false);
    const { nodeDimensions } = useNodeEditor();

    return (
        <div className={`relative bg-background text-white p-3 rounded-lg shadow-md border border-gray-600 flex justify-between hover:border-blue-600`}
            style={{ width: (nodeDimensions as NodeDimensionsProps).width, height: (nodeDimensions as NodeDimensionsProps).height }}
        >
            <Tooltip isOpen={isOpenTooltip} />

            {/* Node Title */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-sm">{data.label}</p>
                    <p className="text-sm text-gray-400 text-xs">{data?.description}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-2 space-x-2">
                <button className="bg-green-600 rounded-md w-5 h-5 flex justify-center items-center ">
                    <Power className="text-white w-3 h-3" />
                </button>
                <button className="bg-gray-600 rounded-md w-5 h-5  flex justify-center items-center"
                    onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                >
                    <MenuIcon className="text-white w-3 h-3" />
                </button>
            </div>

            {/* Handles for connections */}
            <Handle type="target" position={Position.Top} className="w-10 h-10 bg-white">
            </Handle>
            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    bottom: "-35px", // Custom Y offset
                    left: "50%", // Center horizontally
                    transform: "translateX(-50%)", // Adjust centering
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    border: "2px solid white",
                }}
            />
        </div>
    );
};

export default CustomNode;
