import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";

export const create = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) => {
    const indentity = await verifyAuth(ctx);

    const project = await ctx.db.insert("projects", {
      name: args.name,
      ownerId: indentity.subject,
      updatedAt: Date.now()
    });

    return project;
  },
});

export const getPartial = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const indentity = await verifyAuth(ctx);

    return await ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerId", indentity.subject))
      .order("desc")
      .take(args.limit)
  }
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    const indentity = await verifyAuth(ctx);

    return await ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerId", indentity.subject))
      .order("desc")
      .collect()
  }
})