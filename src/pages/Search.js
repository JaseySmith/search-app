import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Post1 from '../img/post1.webp';
import Post2 from '../img/post2.webp';
import Post3 from '../img/post3.webp';
import Post4 from '../img/post4.webp';
import Post5 from '../img/post5.webp';
import Post6 from '../img/post6.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div>
        <Header />
        <div id="search">
            <div className="relative">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" id="address" name="address" placeholder="Enter a valid address..." autoFocus></input>
            </div>
            <div className="flex">
                <h2>Scary Places</h2>
                <div class="input">
                    <div class="style-select">
                        <select name="sortby" id="sortby">
                            <option value="Categories...">Sort By:</option>
                            <option value="Abandoned">Abandoned</option>
                            <option value="Castles">Castles</option>
                            <option value="Catacombs">Catacombs</option>
                            <option value="Forests">Forests</option>
                            <option value="Haunted">Haunted</option>
                            <option value="Asylums">Asylums</option>
                            <option value="Prisons">Prisons</option>
                        </select>
                        <span class="focus"></span>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card">
                    <a href="/">
                        <img src={Post1} alt="" />
                        <div className="overlay">
                            <h3>Chernobyl</h3>
                            <p className="text"><FontAwesomeIcon icon={faLocationDot} />Kyiv Oblast, Ukraine</p>
                        </div>
                    </a>
                </div>
                <div className="card">
                    <a href="/">
                        <img src={Post2} alt="" />
                        <div className="overlay">
                            <h3>The Queen Mary</h3>
                            <p className="text"><FontAwesomeIcon icon={faLocationDot} />Long Beach, California</p>
                        </div>
                    </a>
                </div>
                <div className="card">
                    <a href="/">
                        <img src={Post3} alt="" />
                        <div className="overlay">
                            <h3>Aokigahara Forest</h3>
                            <p className="text"><FontAwesomeIcon icon={faLocationDot} />Yamanashi, Japan</p>
                        </div>
                    </a>
                </div>
                <div className="card">
                    <a href="/">
                        <img src={Post4} alt="" />
                        <div className="overlay">
                            <h3>Willard Asylum</h3>
                            <p className="text"><FontAwesomeIcon icon={faLocationDot} />Willard, New York</p>
                        </div>
                    </a>
                </div>
                <div className="card">
                    <a href="/">
                        <img src={Post5} alt="" />
                        <div className="overlay">
                            <h3>Catacombs of Paris</h3>
                            <p className="text"><FontAwesomeIcon icon={faLocationDot} />Paris, France</p>
                        </div>
                    </a>
                </div>
                <div className="card">
                    <a href="/">
                        <img src={Post6} alt="" />
                        <div className="overlay">
                            <h3>Alcatraz</h3>
                            <p className="text"><FontAwesomeIcon icon={faLocationDot} />San Francisco, California</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Home;