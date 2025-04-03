import React from 'react';
import Map from "../img/map.png";

function About() {
    return (
      <div>
          <div id="about">
            <h2>How It Works</h2>
              <div className="container">
                <img src={Map} alt=""></img>
                <div className="text">
                  <p>ScaryPlacesNearMe is your gateway to discovering haunted locations worldwide. Simply search by location and uncover a vast collection of eerie places that stir curiosity and invite exploration. Whether you're looking to share these mysterious spots with others or daring to visit them yourself, the adventure starts <a href="/search"><span className="accentColor">here.</span></a></p>
                </div>
              </div>
          </div>
      </div>
    );
  }
  
  export default About;