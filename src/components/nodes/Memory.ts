export const MemoryNode = {
    type: "memory",
    name: "Memory Store",
    description: "Stores data for later use",
    inputs: [
        { 
            key: "key", 
            label: "Key", 
            type: "string", 
            placeholder: "memory_key", 
            value: "default_key" 
        }
    ],
    outputs: [
        { key: "value", label: "Value", type: "object" }
    ]
};
