import { FetchClient } from "../lib/fetch/fetch-client";

const api = new FetchClient({
  baseUrl: process.env.SERVER_URL as string,
  options: {
    credentials: "include",
  },
});

export default api;
