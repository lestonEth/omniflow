export const ConditionNode = {
    type: "condition",
    name: "Conditional Logic",
    description: "Evaluates conditions",
    inputs: [
        { 
            key: "expression", 
            label: "Expression", 
            type: "string", 
            placeholder: "status === 200", 
            value: "status === 200" 
        }
    ],
    outputs: [
        { key: "result", label: "Result", type: "boolean" }
    ]
};
