import axios from "axios";

export const fetcher = (url: string, query?: unknown) =>
  axios
    .get(url, {
      params: query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data);
