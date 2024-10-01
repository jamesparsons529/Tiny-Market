// LIBRARY IMPORTS
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

// CSS FILES
import "./App.css";

// PAGE FILES
import Home from './components/pages/home.js';
import Profile from './components/pages/profile.js';
import AssetSell from './components/pages/AssetSell.js';
import AssetPurchase from './components/pages/AssetPurchase.js';
import CancelListing from './components/pages/CancelListing.js';

// CONTRACT FUNCTIONS
import ConnectWallet from "./components/ConnectWallet";
import Mint from "./components/Mint";
import { userSession } from "./components/ConnectWallet"; 

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const isUserSignedIn = userSession.isUserSignedIn(); 

  if (!isUserSignedIn) {
    // If not signed in, alert the user and redirect to home
    window.alert("You must sign in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children; 
}

function App() {
  const [initialView, setInitialView] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Navbar will always be visible */}
        <nav>
          <ConnectWallet />
          <div className="nav-center">
            <Link to="/" class = 'Nav-Header'onClick={() => setInitialView(false)}>Tiny Market</Link>
          </div>
          <div className="nav-menu">
            <Link to="/" onClick={() => setInitialView(false)} className="App-link">Home</Link>
            <Link to="/profile" onClick={() => setInitialView(false)} className="App-link">Profile</Link>
            <Link to="/assetsell" onClick={() => setInitialView(false)} className="App-link">Sell your NFTs</Link>
            <Link to="/cancellisting" onClick={() => setInitialView(false)} className="App-link">Cancel Listing</Link>
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
            {/* Use ProtectedRoute to wrap routes that require login */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assetsell"
              element={
                <ProtectedRoute>
                  <AssetSell />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assetpurchase"
              element={
                <ProtectedRoute>
                  <AssetPurchase />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancellisting"
              element={
                <ProtectedRoute>
                  <CancelListing/>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
