import axios from "axios";

// In development we use Vite dev server proxy (set VITE_API_URL to empty string
// in `.env.development`), in production set VITE_API_URL to your backend URL.
const base = (import.meta.env.VITE_API_URL ?? "").toString();

const api = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
