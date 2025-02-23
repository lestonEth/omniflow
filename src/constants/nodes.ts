import { ActionNode, EventNode, ConditionNode, MemoryNode } from "@/components/nodes";

export const nodesList: Record<string, any> = {
    Action: ActionNode,
    Event: EventNode,
    Memory: MemoryNode,
    Condition: ConditionNode,
};
