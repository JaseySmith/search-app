import React from 'react';
import Category1 from '../img/category1.png';
import Category2 from '../img/category2.png';
import Category3 from '../img/category3.png';
import Category4 from '../img/category4.png';
import Category5 from '../img/category5.png';
import Category6 from '../img/category6.png';

function Category() {
    return (
      <div>
          <div id="category">
            <h2>Explore By Category</h2>
            <div className="container">
              <div className="fade-in-up card" style={{ animationDelay: "0.1s" }}>
                <a href="http://www.scaryplacesnearme.com" target="_blank" rel="noreferrer">
                  <img src={Category1} alt="scaryplacesnearme.com" />
                  <div className="overlay">
                    <h3>Abandoned Structures</h3>
                  </div>
                </a>
              </div>
              <div className="fade-in-up card" style={{ animationDelay: "0.2s" }}>
                <a href="https://www.haysclaysco.com" target="_blank" rel="noreferrer">
                  <img src={Category2} alt="haysclaysco.com" />
                  <div className="overlay">
                    <h3>Asylums & Hospitals</h3>
                  </div>
                </a>
              </div>
              <div className="fade-in-up card" style={{ animationDelay: "0.3s" }}>
                <a href="https://www.championtowandtransport.com" target="_blank" rel="noreferrer">
                  <img src={Category3} alt="championtowandtransport.com" />
                  <div className="overlay">
                    <h3>Castles & Strongholds</h3>
                  </div>
                </a>
              </div>
              <div className="fade-in-up card" style={{ animationDelay: "0.4s" }}>
                <a href="https://codepen.io/JaseySmith/full/wvjrJvg" target="_blank" rel="noreferrer">
                  <img src={Category4} alt="To-do List" />
                  <div className="overlay">
                    <h3>Haunted Houses</h3>
                  </div>
                </a>
              </div>
              <div className="fade-in-up card" style={{ animationDelay: "0.5s" }}>
                <a href="https://codepen.io/JaseySmith/full/NWrQGba" target="_blank" rel="noreferrer">
                  <img src={Category5} alt="Random Quote Machine" />
                  <div className="overlay">
                    <h3>Tombs & Catacombs</h3>
                  </div>
                </a>
              </div>
              <div className="fade-in-up card" style={{ animationDelay: "0.6s" }}>
                <a href="https://codepen.io/JaseySmith/full/MWjYWzr" target="_blank" rel="noreferrer">
                  <img src={Category6} alt="Pomodoro Timer" />
                  <div className="overlay">
                    <h3>Remote Areas</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
      </div>
    );
  }
  
  export default Category;