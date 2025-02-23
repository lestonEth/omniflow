"use client";
import React from "react";
import { useNodeEditor } from "@/hooks/useNodeEditor";
import DraggableTab from "../custom_widgets/DraggableTab";
import { select } from "framer-motion/client";
import { Bot } from "lucide-react";
export default function NodeSidebar() {
    const {
        activeTab,
        nodesList,
        setActiveTab,
        formData,
        handleChange,
        handleSubmit,
        error,
        data,
        code,
        loading,
        selectedNode,
    } = useNodeEditor();

    return (
        <div className="w-[320px] max-h-[90vh] text-white border-l border-gray-600 h-full py-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 overflow-y-auto">
            {/* Tabs */}
            <div className="tabs w-full">
                <ul className="tab-list flex justify-between items-center px-2 gap-1 border border-gray-900 rounded-xl">
                    {Object.keys(nodesList).map((tab) => (
                        <DraggableTab
                            key={tab}
                            tab={tab}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    ))}
                </ul>
            </div>

            <div className="p-2">
                {selectedNode ? (
                    <>
                        {/* Node Name */}
                        <h3 className="flex space-x-2 items-center gap-2 border-b border-gray-700 py-2"><Bot /> Node Type: <span className="text-yellow-300 font-bold">{selectedNode.type}</span></h3>
                        <p className="text-sm text-gray-400 py-2">Node Name</p>
                        <input
                            type="text"
                            value={formData.label ?? selectedNode.data?.label ?? ""}
                            onChange={(e) => handleChange("label", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-2 py-1 rounded-md focus:outline-none focus:border-gray-400"
                        />

                        {/* Node Description */}
                        <p className="text-sm text-gray-400 py-2">Node Description</p>
                        <input
                            type="text"
                            value={formData.description ?? selectedNode.data?.description ?? ""}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white text-sm px-2 py-1 rounded-md focus:outline-none focus:border-gray-400"
                        />

                        {/* Inputs */}
                        <h4 className="mt-3 font-semibold text-sm">📌 Inputs</h4>
                        <div className="space-y-2">
                            {Array.isArray(selectedNode.data?.inputs) &&
                                selectedNode.data.inputs.map((input: any) => (
                                    <div key={input.key} className="text-xs">
                                        <label className="block text-gray-300 mt-2">{input.label}</label>
                                        {input.type === "select" ? (
                                            <select
                                                className="w-full bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-gray-400"
                                                value={formData[input.key] ?? selectedNode.data?.inputs?.find((i: any) => i.key === input.key)?.value ?? ""}
                                                onChange={(e) => handleChange(input.key, e.target.value)}
                                            >
                                                {input.options.map((option: any) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : input.key === "body" || input.type === "headers" ? (
                                            <textarea
                                                className="w-full bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:border-gray-400"
                                                placeholder={input.placeholder}
                                                rows={4}
                                                value={formData[input.key] ?? selectedNode.data?.inputs?.find((i: any) => i.key === input.key)?.value ?? ""}
                                                onChange={(e) => handleChange(input.key, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={selectedNode.data?.inputs?.find((i: any) => i.key === input.key)?.value}
                                                onChange={(e) => handleChange(input.key, e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 text-white px-2 py-2 rounded-md focus:outline-none focus:border-gray-400"
                                                placeholder={input.placeholder}
                                            />
                                        )}
                                    </div>
                                ))}
                        </div>

                        {/* Meta Inputs */}
                        <h4 className="mt-3 font-semibold text-sm">⚙️ Meta</h4>
                        <div className="space-y-2">
                            {selectedNode.data?.meta &&
                                Object.entries(selectedNode.data.meta).map(([key, value]: [string, any]) => (
                                    <div key={key} className="text-xs">
                                        <label className="block text-gray-300 mt-2">{key}</label>
                                        <input
                                            type="text"
                                            value={formData[key] ?? value ?? ""}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 text-white px-2 py-2 rounded-md focus:outline-none focus:border-gray-400"
                                            placeholder={`Enter ${key}`}
                                        />
                                    </div>
                                ))}

                            {/* Add new input if usesEnvFile is true */}
                            {selectedNode.data?.meta?.env && (
                                <div className="text-xs">
                                    <label className="block text-gray-300 mt-2">.env Variable</label>
                                    <input
                                        type="text"
                                        value={formData.envVariable ?? ""}
                                        onChange={(e) => handleChange("envVariable", e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 text-white px-2 py-2 rounded-md focus:outline-none focus:border-gray-400"
                                        placeholder="Enter environment variable"
                                    />
                                    <button
                                        onClick={() => handleChange("envVariable", "")}
                                        className="mt-2 text-xs text-red-500 hover:text-red-600"
                                    >
                                        ✖ Clear
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Outputs */}
                        <h4 className="mt-3 font-semibold text-sm">🖥 Outputs</h4>
                        <div className="space-y-2">
                            {data !== null &&
                                Array.isArray(selectedNode.data?.outputs) &&
                                selectedNode.data.outputs.map((output: any) => (
                                    <div key={output.key} className="text-xs">
                                        <label className="block text-gray-300 mt-2">
                                            {loading ? <div className="animate-pulse bg-gray-700 h-4 w-20 rounded-md"></div> : output.label}
                                        </label>
                                        <span
                                            className="block bg-gray-800 border border-gray-700 text-white px-2 rounded-md py-2 overflow-y-auto overflow-x-hidden"
                                            style={output.key === "response" ? { height: "12rem", borderRadius: "0.5rem" } : {}}
                                        >
                                            {output.key === "response" ? (
                                                <>
                                                    {error && <p className="text-red-500 text-xs mt-2">Error: {error}</p>}
                                                    {data ? (
                                                        <p className={`${code && code >= 200 && code < 300 ? "text-green-500" : "text-red-500"} text-xs mt-2`}>
                                                            {JSON.stringify(data)}
                                                        </p>
                                                    ) : loading ? (
                                                        <p className="text-xs mt-2">Loading...</p>
                                                    ) : null}
                                                </>
                                            ) : (
                                                <span>{code || "Null"}</span>
                                            )}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold"
                        >
                            {loading ? "Testing..." : "Test"}
                        </button>
                    </>
                ) : (
                    <p className="text-sm text-gray-400">No node selected</p>
                )}
            </div>
        </div>
    );
}
