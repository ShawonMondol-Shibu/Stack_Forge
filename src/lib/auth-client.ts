import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_KEY,
  fetchOptions: {
    credentials: "include", // Send cookies with requests
  }
});
