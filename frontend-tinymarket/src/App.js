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
import transactionHistory from './components/pages/transactionHistory.js';

// CONTRACT FUNCTIONS
import ConnectWallet from "./components/ConnectWallet";
import Mint from "./components/Mint";
import { userSession } from "./components/ConnectWallet"; // Assuming userSession is managed here

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const isUserSignedIn = userSession.isUserSignedIn(); // Check login status

  if (!isUserSignedIn) {
    // If not signed in, alert the user and redirect to home
    window.alert("You must sign in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children; // If signed in, render the protected component
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
              path="/transactions"
              element={
                <ProtectedRoute>
                  <transactionHistory />
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
