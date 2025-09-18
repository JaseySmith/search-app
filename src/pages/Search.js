import { useState } from "react";
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

    const [distance, setDistance] = useState("100");

    const addImageUrls = (places) =>
        places.map((place) => ({
          ...place,
          image: imageMap[place.image] || '', // fallback if image not found
        }));
      
    
    const [filtered, setFiltered] = useState(addImageUrls(allLocations));
      
    
    const [address, setAddress] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPlace, setSelectedPlace] = useState(null);
    

    // Haversine distance function
    function getDistanceInMiles(coord1, coord2) {
        const toRad = (value) => (value * Math.PI) / 180;
      
        const R = 3958.8; // Earth radius in miles
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

    const handleSearch = async () => {
        console.log('=== SEARCH TRIGGERED ===');
        console.log('selectedPlace:', selectedPlace);
        console.log('address state:', address);
        console.log('selectedPlace.lat:', selectedPlace?.lat);
        console.log('selectedPlace.lng:', selectedPlace?.lng);
        
        let coords = null;
        
        if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
            console.log('✅ Using selected place coordinates');
            coords = {
                lat: selectedPlace.lat,
                lng: selectedPlace.lng
            };
        } else {
            // Use the address from selectedPlace or the input field
            const addressToSearch = selectedPlace ? selectedPlace.formatted_address || selectedPlace.name : address;
            console.log('Address to search:', addressToSearch);
            console.log('Address length:', addressToSearch?.length);
            console.log('Address trimmed:', addressToSearch?.trim());
            
            // Only geocode if an address was provided
            if (addressToSearch && addressToSearch.trim() !== '') {
                console.log('🔄 Attempting geocoding...');
                try {
                    coords = await geocodeAddress(addressToSearch);
                    if (!coords) {
                        console.warn('❌ Geocoding failed for:', addressToSearch);
                        // Don't show alert, just continue with no coordinates
                    } else {
                        console.log('✅ Geocoding successful:', coords);
                    }
                } catch (error) {
                    console.error('❌ Geocoding error:', error);
                    // Don't show alert, just continue with no coordinates
                }
            } else {
                console.log('ℹ️ No address provided, searching all locations');
            }
            // If no address provided, coords will remain null and we'll search all locations
        }
        
        console.log('Final coords:', coords);
        console.log('=== END SEARCH LOGIC ===');

        const allWithImages = addImageUrls(allLocations);

        const results = allWithImages.filter((place) => {
            const matchCategory = selectedCategory
                ? place.category === selectedCategory
                : true;

            // Only filter by distance if coordinates are provided
            const matchDistance = coords 
                ? getDistanceInMiles(coords, { lat: place.lat, lng: place.lng }) <= parseFloat(distance)
                : true;

            return matchCategory && matchDistance;
        });
      
        setFiltered(results);
        
        // Scroll to results section
        setTimeout(() => {
            const resultsSection = document.querySelector('.results-section');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    // Handle place selection from Google Places
    const handlePlaceSelect = (place) => {
        console.log('Search component received place:', place);
        if (place) {
            setAddress(place.formatted_address);
            setSelectedPlace(place);
        } else {
            // Place was cleared
            setAddress('');
            setSelectedPlace(null);
        }
    };

    // Handle address input change (when user types or clears)
    const handleAddressChange = (e) => {
        const newAddress = e.target.value;
        console.log('Address changed to:', newAddress);
        setAddress(newAddress);
        // Clear selectedPlace if address is empty
        if (!newAddress.trim()) {
            console.log('Clearing selectedPlace because address is empty');
            setSelectedPlace(null);
        }
    };

    const geocodeAddress = async (address) => {
        // Use Google Geocoding API instead of OpenStreetMap to avoid CORS issues
        if (!window.google || !window.google.maps) {
            console.error('Google Maps API not loaded');
            return null;
        }

        return new Promise((resolve) => {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    resolve({
                        lat: location.lat(),
                        lng: location.lng()
                    });
                } else {
                    console.error('Geocoding failed:', status);
                    resolve(null);
                }
            });
        });
    };

      

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
                    onSubmit={handleSearch}
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
                        
                        <button className="btn btn-primary search-btn" onClick={handleSearch}>
                            Search Locations
                        </button>
                    </div>
                </div>
                
                <div className="map-container">
                    <div className="map-wrapper">
                        <PlacesMap 
                            places={filtered}
                            searchCenter={selectedPlace && selectedPlace.lat ? [selectedPlace.lat, selectedPlace.lng] : null}
                            searchRadius={selectedPlace && selectedPlace.lat ? parseFloat(distance) : null}
                        />
                    </div>
                </div>
            </div>
            
            <div className="results-section">
                <div className="results-header">
                    <h2>Search Results</h2>
                    <p className="results-count">{filtered.length} haunted locations found</p>
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