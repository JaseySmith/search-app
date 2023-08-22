import React from 'react';

function Home() {
  return (
    <div>
        <div id="home">
            <div className="container">
                <h1>Explore Scary Places Near You</h1>
                <p className="text">Uncover haunted places worldwide or investigate eerie spots nearby. Begin your search with any address and set off on a chilling journey through the cryptic realms of history's secrets.</p>
                <div className="flex">
                    <a className="btn" href="/search">Begin Search</a>
                    <a className="alt-btn" href="#about">Learn More</a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;