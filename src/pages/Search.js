import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Map from "../components/Map";
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
        const coords = await geocodeAddress(address);
        if (!coords) {
          alert("Address not found. Try being more specific.");
          return;
        }
      
      
        const allWithImages = addImageUrls(allLocations);

        const results = allWithImages.filter((place) => {
        const matchCategory = selectedCategory
            ? place.category === selectedCategory
            : true;
      
          const matchDistance =
            getDistanceInMiles(coords, { lat: place.lat, lng: place.lng }) <= parseFloat(distance);
      
          return matchCategory && matchDistance;
        });
      
        setFiltered(results);
    };

    const geocodeAddress = async (address) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await response.json();
    
    if (data.length > 0) {
        return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        };
    }
    
    return null;
    };

      

  return (
    <div>
        <Header />
        <div id="search">
            
            <div className="flex">
                <h2>Enter an Address</h2>
                <div className="grid">
                    <div className="relative">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" id="address" name="address" placeholder="1234 Haunted Lane..." value={address} onChange={(e) => setAddress(e.target.value)} autoFocus />
                    </div>
                    <div class="sort">
                        <FontAwesomeIcon icon={faSortDown} />
                        <div class="style-select">
                            <select name="sortby" id="sortby" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}> 
                                <option value="">Sort By:</option>
                                <option value="Abandoned Structures">Abandoned Structures</option>
                                <option value="Asylums & Hospitals">Asylums & Hospitals</option>
                                <option value="Castles & Strongholds">Castles & Strongholds</option>
                                <option value="Haunted Houses">Haunted Houses</option>
                                <option value="Tombs & Catacombs">Tombs & Catacombs</option>
                                <option value="Remote Areas">Remote Areas</option>
                            </select>
                            <span class="focus"></span>
                        </div>
                    </div>
                    <div className="distance-filter">
                        <p>Within:</p>
                        {["25", "50", "100", "250", "500"].map((mi) => (
                            <button
                                key={mi}
                                className={`pill ${distance === mi ? "active" : ""}`}
                                onClick={() => setDistance(mi)}
                            >
                                 {mi} mi
                            </button>
                        ))}
                    </div>
                    <div className="btn" onClick={handleSearch}>Search</div>
                </div>
                <section className="map-wrapper">
                    <Map />
                </section>
            </div>
            <div>
                <h2>Results:</h2>
            </div>
            <div className="container">
                {filtered.map((place) => (
                    <Card key={place.id} {...place} />
                ))}
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Search;