export const apiUrl = (
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:6969"
).replace(/\/+$/, "");

export const apiService = async (
  endpoint = "",
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  options?: RequestInit,
) => {
  const cleanEndpoint = endpoint.replace(/^\/+/, "");

  const url = cleanEndpoint ? `${apiUrl}/${cleanEndpoint}` : apiUrl;

  const res = await fetch(url, {
    ...options,
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let message = `API error: ${res.status} ${res.statusText}`;

    try {
      const data = await res.json();

      if (data?.message) {
        message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
      }
    } catch {
      // Response wasn't JSON
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
};
