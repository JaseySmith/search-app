import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight, faGhost } from '@fortawesome/free-solid-svg-icons';


const LocationCard = ({ name, location, image, description, link, category }) => (
  <a href={link} target="_blank" rel="noreferrer" className="location-card">
    <div className="location-image-container">
      <img src={image} alt={name} className="location-image" />
      <div className="location-image-overlay"></div>
      <div className="location-category-badge">
        <FontAwesomeIcon icon={faGhost} className="category-icon" />
        <span>{category}</span>
      </div>
    </div>
    <div className="location-content">
      <div className="location-header">
        <h3 className="location-title">{name}</h3>
        <div className="location-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
      <p className="location-meta">
        <FontAwesomeIcon icon={faLocationDot} className="icon" />
        {location}
      </p>
      <p className="location-description">{description}</p>
    </div>
  </a>
);

export default LocationCard;
