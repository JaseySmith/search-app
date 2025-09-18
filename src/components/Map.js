import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix missing default marker icons in Leaflet (when using bundlers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PlacesMap = ({
  places = [],            // [{ id, lat, lng, name, location, category }, ...] from parent (filtered)
  searchCenter = null,    // [lat, lng] or null
  searchRadius = null     // miles or null
}) => {
  // Compute zoom level from radius (keeps your original behavior)
  const getZoomFromRadius = (radiusMiles) => {
    if (!radiusMiles) return 4; // default
    if (radiusMiles <= 25) return 10;
    if (radiusMiles <= 50) return 9;
    if (radiusMiles <= 100) return 8;
    if (radiusMiles <= 250) return 7;
    if (radiusMiles <= 500) return 6;
    return 5;
  };

  const mapCenter = searchCenter || [39, -95]; // USA-ish center
  const mapZoom = searchCenter ? getZoomFromRadius(searchRadius) : 4;

  // Memoize custom icons so they aren’t re-created every render
  const searchIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  const placeIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  const milesToMeters = (mi) => Number(mi) * 1609.344;

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      minZoom={2}
      maxZoom={16}
      worldCopyJump={true}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      // Force re-render when center/zoom changes so the view updates reliably
      key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
    >
      <TileLayer
        url="https://tile.jawg.io/7410c418-d06c-43b2-8ce4-941eee38a79e/{z}/{x}/{y}{r}.png?access-token=4CW9zrlEYamZshjUQecsMk6qpWI12bCPNHcGdVrUilmuxhpJGZQ1UMAmJKVfCa8i"
        attribution='<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a> contributors'
        maxZoom={20}
      />

      {/* Optional: draw a search circle if center + radius provided */}
      {searchCenter && searchRadius != null && (
        <Circle
          center={searchCenter}
          radius={milesToMeters(searchRadius)}
          pathOptions={{ color: "#ff4757", weight: 2, fillOpacity: 0.1 }}
        />
      )}

      {/* Search location marker (red) */}
      {searchCenter && (
        <Marker position={searchCenter} icon={searchIcon}>
          <Popup>
            <strong>Search Location</strong>
            <br />
            {searchRadius ? `Within ${searchRadius} miles` : "Search center"}
          </Popup>
        </Marker>
      )}

      {/* Scary places markers (blue) */}
      {places.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lng]} icon={placeIcon}>
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.location}
            <br />
            <small>{place.category}</small>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PlacesMap;
