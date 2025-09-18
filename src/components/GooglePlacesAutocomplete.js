import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const GooglePlacesAutocomplete = ({
  onPlaceSelect,          // fires on real Google selection (mouse or Enter on a suggestion)
  onSubmit,               // called with current input value on Enter when no suggestion is being selected
  onAddressChange,
  placeholder = "Enter your address or city..."
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setSelectedPlace] = useState(null);

  const handlePlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;

    const place = ac.getPlace();
    const hasGeom =
      place?.geometry?.location &&
      typeof place.geometry.location.lat === "function" &&
      typeof place.geometry.location.lng === "function";

    const hasText =
      (place?.formatted_address && place.formatted_address.trim() !== "") ||
      (place?.name && place.name.trim() !== "");

    if (hasGeom && hasText) {
      const placeData = {
        place_id: place.place_id,
        formatted_address: place.formatted_address,
        name: place.name || place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address_components: place.address_components || []
      };
      setSelectedPlace(placeData);
      onPlaceSelect?.(placeData); // parent effect will trigger search
    } else if (hasText) {
      const placeData = {
        place_id: place.place_id || "",
        formatted_address: place.formatted_address || place.name,
        name: place.name || place.formatted_address,
        lat: null,
        lng: null,
        address_components: place.address_components || []
      };
      setSelectedPlace(placeData);
      onPlaceSelect?.(placeData);
    } else {
      setSelectedPlace(null);
      onPlaceSelect?.(null);
    }
  }, [onPlaceSelect]);

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google) return;

    const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      fields: ["place_id", "formatted_address", "geometry", "name", "address_components"],
      // componentRestrictions: { country: ["us"] }, // optional
    });

    autocompleteRef.current = ac;
    ac.addListener("place_changed", handlePlaceChanged);
  }, [handlePlaceChanged]);

  useEffect(() => {
    let timer;
    const checkGoogleMaps = () => {
      if (window.google?.maps?.places) {
        setIsLoaded(true);
        initializeAutocomplete();
      } else {
        timer = setTimeout(checkGoogleMaps, 100);
      }
    };
    checkGoogleMaps();

    return () => {
      if (timer) clearTimeout(timer);
      const ac = autocompleteRef.current;
      if (ac && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(ac);
      }
    };
  }, [initializeAutocomplete]);

  // Submit on Enter for free-text. If a dropdown item is actively being chosen,
  // let Google fire place_changed instead (avoids double-submit).
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();

      const container = document.querySelector(".pac-container");
      const highlighted = document.querySelector(".pac-item.pac-item-selected");

      const dropdownOpen =
        container && (container.style.display === "" || container.style.display === "block");

      if (dropdownOpen && highlighted) {
        // Let Google trigger place_changed → parent effect will search.
        return;
      }

      const val = inputRef.current?.value ?? "";
      onSubmit?.(val); // parent will geocode and search
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="input-wrapper">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            // Clear local selection and tell parent text changed (parent clears its selection too)
            setSelectedPlace(null);
            onAddressChange?.(e);
          }}
          style={{
            width: '100%',
            padding: '22px 20px 22px 60px',
            fontSize: '16px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '500',
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
      </div>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;