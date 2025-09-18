import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const GooglePlacesAutocomplete = ({ onPlaceSelect, onSubmit, onAddressChange, placeholder = "Enter your address or city..." }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setSelectedPlace] = useState(null);

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google) return;

    console.log('Initializing Google Places Autocomplete...');
    
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      fields: ['place_id', 'formatted_address', 'geometry', 'name', 'address_components']
    });

    autocompleteRef.current.addListener('place_changed', () => {
      console.log('Place changed event fired!');
      const place = autocompleteRef.current.getPlace();
      console.log('Selected place:', place);
      
      // Check if this is a valid place selection (not just clearing the input)
      const isValidPlace = place && 
        (place.geometry && place.geometry.location) && 
        place.formatted_address && 
        place.formatted_address.trim() !== '';
      
      if (isValidPlace) {
        const placeData = {
          place_id: place.place_id,
          formatted_address: place.formatted_address,
          name: place.name || place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address_components: place.address_components
        };
        
        console.log('Setting selected place:', placeData);
        setSelectedPlace(placeData);
        
        if (onPlaceSelect) {
          onPlaceSelect(placeData);
        }
      } else if (place && place.name && place.name.trim() !== '') {
        // If place exists but no geometry, just use the name for search
        const placeData = {
          place_id: place.place_id || '',
          formatted_address: place.formatted_address || place.name,
          name: place.name,
          lat: null,
          lng: null,
          address_components: place.address_components || []
        };
        
        console.log('Setting selected place (no geometry):', placeData);
        setSelectedPlace(placeData);
        
        if (onPlaceSelect) {
          onPlaceSelect(placeData);
        }
      } else {
        // Invalid or empty place - clear the selection
        console.log('Invalid/empty place, clearing selection');
        setSelectedPlace(null);
        if (onPlaceSelect) {
          onPlaceSelect(null);
        }
      }
    });
  }, [onPlaceSelect]);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true);
        initializeAutocomplete();
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
  }, [initializeAutocomplete]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Check if Google Places dropdown is open
      const dropdown = document.querySelector('.pac-container');
      const isDropdownOpen = dropdown && dropdown.style.display !== 'none';
      
      if (isDropdownOpen) {
        // Try to select the highlighted item in the dropdown
        const highlightedItem = document.querySelector('.pac-item.pac-item-selected');
        if (highlightedItem) {
          // Simulate a click on the highlighted item
          highlightedItem.click();
          // Wait for place_changed event to fire, then submit
          setTimeout(() => {
            if (onSubmit) {
              onSubmit();
            }
          }, 200);
        } else {
          // No highlighted item, just submit with current input
          if (onSubmit) {
            onSubmit();
          }
        }
      } else {
        // Dropdown is closed, submit normally
        if (onSubmit) {
          onSubmit();
        }
      }
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
          onKeyPress={handleKeyPress}
          onChange={(e) => {
            console.log('Input changed, clearing selected place');
            setSelectedPlace(null);
            if (onAddressChange) {
              onAddressChange(e);
            }
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