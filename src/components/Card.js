import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Card = ({ image, title, location }) => {
  return (
    <div className="card">
      <a href="/">
        <img src={image} alt="" />
        <div className="content">
          <h3>{title}</h3>
          <p className="text"><FontAwesomeIcon icon={faLocationDot} />{location}</p>
        </div>
      </a>
    </div>
  );
}

export default Card;