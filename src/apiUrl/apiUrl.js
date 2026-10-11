// Base URL of the backend API. Override with VITE_API_BASE_URL (e.g. a local
// backend at http://localhost:5023) — falls back to the deployed API.
const base = (
  import.meta.env.VITE_API_BASE_URL || "https://cia.makeupcoders.com"
).replace(/\/+$/, "");

const apiurl = {
  mainUrl: base,
  imgUrl: `${base}/`,
};

export default apiurl;
