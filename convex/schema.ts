import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; // Import validation helpers

export default defineSchema({
    projects: defineTable({
        name: v.string(),       // Corrected type
        nodes: v.any(),         // Use v.any() instead of v.json()
        edges: v.any(),         // Use v.any() instead of v.json()
        createdAt: v.number(),  // Corrected type
    }),
    nodes: defineTable({
        text: v.string(),       // Corrected type
    })
});
