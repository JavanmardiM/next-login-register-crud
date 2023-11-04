export const storage = {
    getToken: () => JSON.parse(localStorage.getItem("token") as string),
    setToken: (token: string) => {
      localStorage.setItem("token", JSON.stringify(token));
    },
    clearToken: () => localStorage.removeItem("token"),
  };
  