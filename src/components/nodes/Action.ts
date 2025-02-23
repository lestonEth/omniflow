export const ActionNode = {
    type: "action",
    name: "API Call",
    description: "Executes an API request",
    inputs: [
        { key: "url", label: "URL", type: "string", placeholder: "https://api.example.com", value: "https://api.example.com" },
        { key: "headers", label: "Headers", type: "object", placeholder: "Authorization: Bearer token", value: { "Authorization": "Bearer token" } },
        { key: "body", label: "Body", type: "object", placeholder: "{ message: 'Hello, AI!' }", value: { message: "Hello, AI!" } },
        { key: "method", label: "Method", type: "select", options: ["GET", "POST", "PUT", "DELETE"], value: "GET" }
    ],
    outputs: [
        { key: "response", label: "Response", type: "object" },
        { key: "status", label: "Status Code", type: "number" }
    ],
    meta: { apiKey: true, env: false }  
};
