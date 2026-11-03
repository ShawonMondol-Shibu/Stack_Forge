import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use the frontend's own origin, so requests go through the /api/auth rewrite
  // in next.config.ts. (On the server there is no window, so better-auth
  // falls back to the relative path /api/auth.)
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
  fetchOptions: {
    credentials: "include",
  },
});