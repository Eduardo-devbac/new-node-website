if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === ""
) {
  window.API_URL = "http://localhost:3000";
} else {
  window.API_URL = "https://new-node-website-production.up.railway.app";
}