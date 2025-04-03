import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import places from "../data/places.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PlacesMap = () => {
  return (
    <MapContainer
      center={[39, -95]} // USA center
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "5px" }}
    >
      <TileLayer
        url="https://tile.jawg.io/7410c418-d06c-43b2-8ce4-941eee38a79e/{z}/{x}/{y}{r}.png?access-token=4CW9zrlEYamZshjUQecsMk6qpWI12bCPNHcGdVrUilmuxhpJGZQ1UMAmJKVfCa8i"
        attribution='<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a> contributors'
        maxZoom={20}
      />
      {places.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lng]}>
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PlacesMap;
