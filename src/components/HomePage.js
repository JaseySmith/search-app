import React from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Social from './Social';
import Footer from './Footer';
import '../App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <About />
      <Social />
      <Footer />
    </div>
  );
}

export default App;