import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div>
        <div id="home">
            <div className="container">
                <h1>Explore Scary Places Near You</h1>
                <p className="text">Enter an address to begin searching the world's largest database of scary places, and please.. be careful with what you discover...</p>
                <div className="flex">
                  <input className="search" type="search" name="search" placeholder="Enter a valid address..."></input>
                  <a href="/search"><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;