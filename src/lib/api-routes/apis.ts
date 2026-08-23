export const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "http://localhost:5000";

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined");
}

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestOptions = {
  endpoint: string;
  method?: ApiMethod;
  body?: unknown;
  options?: RequestInit;
};

export const apiService = async <T>({
  endpoint,
  method = "GET",
  body,
  options,
}: ApiRequestOptions): Promise<T> => {
  const cleanEndpoint = endpoint.replace(/^\/+|\/+$/g, "");

  const url = cleanEndpoint ? `${apiUrl}/${cleanEndpoint}` : apiUrl;

  const res = await fetch(url, {
    ...options,
    method,
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },

    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `API error: ${res.status}`;

    try {
      const errorData = await res.json();

      if (errorData?.message) {
        message = Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message;
      }
    } catch {
      // Non-JSON response
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json() as Promise<T>;
};
