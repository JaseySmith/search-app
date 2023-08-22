import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

function About() {
    return (
      <div>
          <div id="about">
            <h2>How It Works</h2>
              <div className="container">
                <div className="card">
                    <FontAwesomeIcon icon={faCompass} />
                    <h3>Search</h3>
                    <p className="text">Embark on a global quest, discovering eerie sites nearby and afar, turning every search into an exciting adventure.</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faReadme} />
                    <h3>Read</h3>
                    <p className="text">Immerse yourself in spooky tales, unraveling the dark history and mysteries that surround your favorite scary places.</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                    <h3>Share</h3>
                    <p className="text">Send haunted highlights to friends, transforming spooky discoveries into shared adventures and communal chills.</p>
                </div>
              </div>
          </div>
      </div>
    );
  }
  
  export default About;