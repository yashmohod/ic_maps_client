const apiClient = {
  get: (url: string) => fetch(url).then((r) => r.json()),

  post: (url: string, body: any) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  put: (url: string, body: any) =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  patch: (url: string, body: any) =>
    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  del: (url: string, body?: any) =>
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }),
};

export default apiClient;
