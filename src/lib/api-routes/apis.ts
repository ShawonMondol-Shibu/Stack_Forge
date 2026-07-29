export const apiUrl = "http://localhost:6969/";
export const apiService = {
  allProfiles: async (endpoint: string, method: string) => {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method: `${method}`,
    });
    return res.json();
  },
};
