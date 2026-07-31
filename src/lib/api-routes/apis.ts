export const apiUrl = "http://localhost:6969/";

export const apiService = async (endpoint?: string, method?: string) => {
  const res = await fetch(`${apiUrl}${endpoint?endpoint:""}`, {
    method: `${method ? method : "GET"}`,
  });
  return res.json();
};
