import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Post1 from '../img/post1.webp';
import Post2 from '../img/post2.webp';
import Post3 from '../img/post3.webp';
import Post4 from '../img/post4.webp';
import Post5 from '../img/post5.webp';
import Post6 from '../img/post6.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div>
        <Header />
        <div id="search">
            <div className="grid">
                <div className="relative">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" id="address" name="address" placeholder="Enter a valid address..." autoFocus></input>
                </div>
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
            <div className="flex">
                <h2>Scary Places</h2>
            </div>
            <div className="container">
                <Card image={Post1} title="Chernobyl" location="Kyiv Oblast, Ukraine" />
                <Card image={Post2} title="The Queen Mary" location="Long Beach, California" />
                <Card image={Post3} title="Aokigahara Forest" location="Yamanashi, Japan" />
                <Card image={Post4} title="Willard Asylum" location="Willard, New York" />
                <Card image={Post5} title="Catacombs of Paris" location="Paris, France" />
                <Card image={Post6} title="Alcatraz" location="San Francisco, California" />
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Home;