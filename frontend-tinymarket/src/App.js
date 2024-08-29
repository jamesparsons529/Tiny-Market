//LIBRARY IMPORTS
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// CSS FILES
import "./App.css";

//PAGE FILES
import Home from './components/pages/home.js';
import Profile from './components/pages/profile.js';
import AssetSell from './components/pages/AssetSell.js';

//CONTRACT FUNCTIONS
import ConnectWallet from "./components/ConnectWallet";
import Mint from "./components/Mint";


function App() {
  const [initialView, setInitialView] = useState(true);
  return (
    <Router>
      <div className="App">
        {initialView ? (
          
          <header className="App-header">
            <Mint/>
            <div className={'navbar'}>
              <div class="left-section">
                <ConnectWallet />
                <Link to="/">Tiny Market</Link>
              </div>
              <div class="menu-toggle">
                <img src="menu-icon.svg" alt="Menu" width="30px"/>
              </div>
              <nav class="menu">
                <a href="browse.htm">Browse</a>
                <a href="sell.htm">Sell</a>
                <a href="index.html" class="active1">Home</a>
              </nav>
            </div>

            {/* Buttons to navigate to different pages */}
            <button onClick={() => setInitialView(false)} className="App-link"><Link to="/">Home</Link></button>
            <button onClick={() => setInitialView(false)} className="App-link"><Link to="/profile">Profile</Link></button>
            <button onClick={() => setInitialView(false)} className="App-link"><Link to="/assetsell">AssetSell</Link></button>
            {/* <button onClick={() => setInitialView(false)} className="App-link"><Link to="/sell">Profile</Link></button>
            <button onClick={() => setInitialView(false)} className="App-link"><Link to="/purchase">Go to Profile</Link></button> */}
          </header>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assetsell" element={<AssetSell />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
