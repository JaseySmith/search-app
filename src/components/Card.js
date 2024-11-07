import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Card = ({ link, image, title, location }) => {
  return (
    <div className="card">
      <a href={link} target="_blank" rel="noreferrer">
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