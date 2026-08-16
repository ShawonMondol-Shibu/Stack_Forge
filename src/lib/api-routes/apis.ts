export const apiUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:6969";

export const apiService = async (
  endpoint?: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  options?: RequestInit
) => {
  const cleanEndpoint = endpoint ? endpoint.replace(/^\/+|\/+$/g, "") : "";
  const url = `${apiUrl}/${cleanEndpoint}`;

  const res = await fetch(url, {
    method,
    credentials: "include", // ব্রাউজার সেশন কুকি অটোমেটিক হেডারে পাঠাবে
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};