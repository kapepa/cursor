import { MutationCtx, QueryCtx } from "./_generated/server";

export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
  const indentity = await ctx.auth.getUserIdentity();
  if (!indentity) throw new Error("Unauthorized");

  return indentity;
}