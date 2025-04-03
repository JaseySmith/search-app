import React from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Category from './Category';
import Social from './Social';
import Footer from './Footer';
import '../App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <About />
      <Category />
      <Social />
      <Footer />
    </div>
  );
}

export default App;