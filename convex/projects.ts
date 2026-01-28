import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) throw new Error("Unauthorized");

    await ctx.db.insert("projects", {
      name: args.name,
      ownerId: indentity.subject
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) return [];

    return await ctx.db.query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerId", indentity.subject))
      .collect()
  }
})