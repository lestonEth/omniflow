export const EventNode = {
    type: "event",
    name: "Event Listener",
    description: "Listens for an event",
    inputs: [
        { 
            key: "eventName", 
            label: "Event Name", 
            type: "string", 
            placeholder: "onClick", 
            value: "onClick" 
        }
    ],
    outputs: [
        { key: "triggered", label: "Triggered", type: "boolean" }
    ]
};
