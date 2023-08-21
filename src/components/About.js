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
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faReadme} />
                    <h3>Read</h3>
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                    <h3>Share</h3>
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                </div>
              </div>
          </div>
      </div>
    );
  }
  
  export default About;