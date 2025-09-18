import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import PlacesMap from "../components/Map";
import GooglePlacesAutocomplete from '../components/GooglePlacesAutocomplete';
import allLocations from '../data/places.json';
import imageMap from '../components/ImageMap';

function Search() {
  const [distance, setDistance] = useState("100"); // keep as string for pills
  const [filtered, setFiltered] = useState([]);
  const [address, setAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  // NEW: keep the last search center separate from selectedPlace,
  // so free-text searches center the map correctly (and not on a stale selection).
  const [searchCenter, setSearchCenter] = useState(null);

  // Add image URLs so cards never break if a key is missing.
  const addImageUrls = (places) =>
    places.map((place) => ({
      ...place,
      image: imageMap[place.image] || '',
    }));

  // Initialize with all places mapped to images.
  useEffect(() => {
    setFiltered(addImageUrls(allLocations));
  }, []);

  // Haversine distance (miles)
  function getDistanceInMiles(coord1, coord2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 3958.8;
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(coord1.lat)) *
        Math.cos(toRad(coord2.lat)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Geocoder with optional region bias (reduces “wrong state” issues).
  const geocodeAddress = async (addr, { region } = {}) => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded');
      return null;
    }
    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder();
      const req = { address: addr };
      if (region) req.region = region;
      geocoder.geocode(req, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const loc = results[0].geometry.location;
          resolve({ lat: loc.lat(), lng: loc.lng() });
        } else {
          console.error('Geocoding failed:', status);
          resolve(null);
        }
      });
    });
  };

  // Unified search. If addressText is provided (free-text Enter),
  // it takes precedence over a stale selectedPlace.
  const searchSeq = useRef(0);
  const handleSearch = useCallback(async (addressText) => {
    const seq = ++searchSeq.current;

    let coords = null;

    if (!addressText?.trim() && selectedPlace && selectedPlace.lat != null && selectedPlace.lng != null) {
      // Use real selection coords
      coords = { lat: selectedPlace.lat, lng: selectedPlace.lng };
    } else {
      const addressToSearch =
        (addressText ?? (selectedPlace ? (selectedPlace.formatted_address || selectedPlace.name) : address)) || '';

      if (addressToSearch.trim()) {
        try {
          coords = await geocodeAddress(addressToSearch, { region: 'US' });
        } catch (e) {
          console.error('Geocoding error:', e);
          coords = null;
        }
      }
      // If still no coords, we'll show all locations (no distance filter)
    }

    const data = addImageUrls(allLocations);
    const distMi = Number(distance) || 0;

    const results = data.filter((pl) => {
      const matchCategory = selectedCategory ? pl.category === selectedCategory : true;
      const matchDistance = coords
        ? getDistanceInMiles(coords, { lat: pl.lat, lng: pl.lng }) <= distMi
        : true;
      return matchCategory && matchDistance;
    });

    if (searchSeq.current === seq) {
      setFiltered(results);
      setSearchCenter(coords ?? null); // keep map center in sync with results

      // Smooth scroll to results after paint
      requestAnimationFrame(() => {
        const el = document.querySelector('.results-section');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [selectedPlace, address, distance, selectedCategory]);

  // Avoid re-running search on every keystroke when a place is already selected:
  // We trigger search only when selectedPlace reference actually changes.
  const handleSearchRef = useRef(handleSearch);
  useEffect(() => { handleSearchRef.current = handleSearch; }, [handleSearch]);

  useEffect(() => {
    if (selectedPlace) {
      // Run search when a new place is picked (mouse or Enter on suggestion)
      handleSearchRef.current();
    }
  }, [selectedPlace]);

  // Place selection coming from the child
  const handlePlaceSelect = (place) => {
    if (place) {
      setAddress(place.formatted_address || place.name || "");
      setSelectedPlace(place);
    } else {
      setAddress('');
      setSelectedPlace(null);
    }
  };

  // Text typing from the child: clear selectedPlace on ANY change to prevent stale coords
  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    if (selectedPlace) setSelectedPlace(null); // important: stop auto-search from old selection
  };

  // Free-text Enter from the child
  const handleChildSubmit = (text) => {
    handleSearch(text);
  };

  const hasCenter = !!(searchCenter && searchCenter.lat != null && searchCenter.lng != null);

  return (
    <div>
      <Header />
      <div id="search">
        <div className="search-header">
          <h1>Discover Haunted Places</h1>
          <p className="search-subtitle">Enter an address to find the most terrifying locations near you</p>
        </div>

        <div className="search-main">
          <div className="search-controls">
            <div className="search-form">
              <GooglePlacesAutocomplete
                onPlaceSelect={handlePlaceSelect}
                onSubmit={handleChildSubmit}   // receives input value on Enter
                onAddressChange={handleAddressChange}
                placeholder="Enter your address or city (optional)..."
              />

              <div className="select-wrapper">
                <FontAwesomeIcon icon={faSortDown} className="select-icon" />
                <select
                  name="sortby"
                  id="sortby"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Abandoned Structures">Abandoned Structures</option>
                  <option value="Asylums & Hospitals">Asylums & Hospitals</option>
                  <option value="Castles & Strongholds">Castles & Strongholds</option>
                  <option value="Haunted Houses">Haunted Houses</option>
                  <option value="Tombs & Catacombs">Tombs & Catacombs</option>
                  <option value="Remote Areas">Remote Areas</option>
                </select>
              </div>

              <div className="distance-filter">
                <span className="distance-label">Within:</span>
                <div className="distance-pills">
                  {["25", "50", "100", "250", "500"].map((mi) => (
                    <button
                      key={mi}
                      className={`distance-pill ${distance === mi ? "active" : ""}`}
                      onClick={() => setDistance(mi)}
                    >
                      {mi} mi
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary search-btn" onClick={() => handleSearch()}>
                Search Locations
              </button>
            </div>
          </div>

          <div className="map-container">
            <div className="map-wrapper">
              <PlacesMap
                places={filtered}
                searchCenter={hasCenter ? [searchCenter.lat, searchCenter.lng] : null}
                searchRadius={hasCenter ? Number(distance) : null}
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="results-header">
            <h2>Search Results</h2>
            <p className="results-count">
              {filtered.length} haunted location{filtered.length === 1 ? '' : 's'} found
            </p>
          </div>

          <div className="results-grid">
            {filtered.map((place) => (
              <Card key={place.id} {...place} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;