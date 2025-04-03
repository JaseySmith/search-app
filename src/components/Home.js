import React from 'react';
import Background from './Background'

function Home() {
  return (
    <div>
        <div id="home">
            <div className="container">
                <h1>Explore Scary Places Near You</h1>
                <p className="text">Enter an address to begin searching the world's largest database of scary places. Please.. be careful with what you discover...</p>
                <a className="btn" href="/Search">Explore Now</a>
            </div>
            <Background />
        </div>
    </div>
  );
}

export default Home;