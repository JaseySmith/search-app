import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


const LocationCard = ({ name, location, image, description, link }) => (
  <div className="location-card">
    <img src={image} alt={name} className="location-image" />
    <div className="location-content">
      <h3 className="location-title">{name}</h3>
      <p className="location-meta">
        <FontAwesomeIcon icon={faLocationDot} className="icon" />
        {location}
      </p>
      <p className="location-description">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="location-link"
      >
        Explore
      </a>
    </div>
  </div>
);

export default LocationCard;
