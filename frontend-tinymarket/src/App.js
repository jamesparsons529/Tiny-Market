// LIBRARY IMPORTS
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// CSS FILES
import "./App.css";

// PAGE FILES
import Home from './components/pages/home.js';
import Profile from './components/pages/profile.js';
import AssetSell from './components/pages/AssetSell.js';
import AssetPurchase from './components/pages/AssetPurchase.js';
import transactionHistory from './components/pages/transactionHistory.js';

// CONTRACT FUNCTIONS
import ConnectWallet from "./components/ConnectWallet";
import Mint from "./components/Mint";

function App() {
  const [initialView, setInitialView] = useState(false);
  
  return (
    <Router>
      <div className="App">
        {/* Navbar will always be visible */}
        <nav>
          <ConnectWallet />
          <div className="nav-center">
            <Link to="/" onClick={() => setInitialView(false)}>Tiny Market</Link>
          </div>
          <div className="nav-menu">
            <Link to="/" onClick={() => setInitialView(false)} className="App-link">Home</Link>
            <Link to="/profile" onClick={() => setInitialView(false)} className="App-link">Profile</Link>
            <Link to="/assetsell" onClick={() => setInitialView(false)} className="App-link">AssetSell</Link>
            <Link to="/assetpurchase" onClick={() => setInitialView(false)} className="App-link">AssetPurchase</Link>
          </div>
        </nav>

        {/* Conditional rendering based on initialView state */}
        {initialView ? (
          <header className="App-header">
            <Mint />
          </header>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assetsell" element={<AssetSell />} />
            <Route path="/assetpurchase" element={<AssetPurchase />} />
            <Route path="/transactions" element={<transactionHistory />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;