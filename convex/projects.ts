import { mutation, query } from "./_generated/server";
import { v } from "convex/values"; // Import validators
import { Id } from "./_generated/dataModel"; // Import Id type

export const saveProject = mutation({
    args: { 
        name: v.string(), 
        nodes: v.any(), 
        edges: v.any()
    },
    handler: async ({ db }, { name, nodes, edges }) => {
        return await db.insert("projects", {
            name,
            nodes,
            edges,
            createdAt: Date.now(),
        });
    }
});

export const getProjects = query({
    handler: async ({ db }) => {
        return await db.query("projects").order("desc").collect();
    }
});

export const getProjectById = query({
    args: { projectId: v.id("projects") }, // Ensure projectId is properly typed
    handler: async ({ db }, { projectId }) => {
        return await db.get(projectId);
    }
});

export const updateProject = mutation({
    args: { 
        projectId: v.id("projects"), 
        name: v.optional(v.string()), 
        nodes: v.optional(v.any()), 
        edges: v.optional(v.any())
    },
    handler: async ({ db }, { projectId, name, nodes, edges }) => {
        // Retrieve the existing project
        const project = await db.get(projectId);
        if (!project) {
            throw new Error("Project not found");
        }

        // Update the project with provided fields
        await db.patch(projectId, {
            ...(name !== undefined && { name }),
            ...(nodes !== undefined && { nodes }),
            ...(edges !== undefined && { edges }),
        });

        return { success: true, project: project};
    }
});
