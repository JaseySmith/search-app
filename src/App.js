import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useEffect } from "react";
import { loadGoogleMaps } from "./components/loadGoogleMaps";
import HomePage from './components/HomePage';
import Contact from './pages/Contact';
import Search from './pages/Search';
import './App.css';

function App() {

  useEffect(() => {
    loadGoogleMaps().catch((e) => {
      console.error("Failed to load Google Maps:", e);
    });
  }, []);
  

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/search' element={<Search />} />
        </Routes>
    </Router>
    </div>
    
  );
}

export default App;