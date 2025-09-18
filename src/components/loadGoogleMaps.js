// src/lib/loadGoogleMaps.js
// Idempotent loader for Google Maps JS using CRA env var.
// Reads REACT_APP_GOOGLE_MAPS_API_KEY at build time (Netlify injects it).

let loadingPromise = null;

export function loadGoogleMaps(
  key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  { libraries = ["places"] } = {}
) {
  if (window.google?.maps) return Promise.resolve(); // already loaded

  if (loadingPromise) return loadingPromise; // in-flight load

  if (!key) {
    console.error("Missing REACT_APP_GOOGLE_MAPS_API_KEY");
    return Promise.reject(new Error("Missing Google Maps API key"));
  }

  const params = new URLSearchParams({
    key,
    libraries: libraries.join(","),
  });

  loadingPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });

  return loadingPromise;
}