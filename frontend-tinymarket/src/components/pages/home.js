import React from 'react';
import Mint from '../Mint';
import { userSession } from '../ConnectWallet'; 
import CurrentListingsAssetCard from '../CurrentListingsAssetCard';
import '../css/home.css'; 

function Home() {
  const isUserSignedIn = userSession.isUserSignedIn(); 

  return (
    <main className="home-container">
      {/* Header Section */}
      <div className="home-header">
        <h1>Home</h1>
        {isUserSignedIn && <p>Welcome to the home page</p>}
      </div>
      
      {/* Mint Button and Listings Section */}
      {isUserSignedIn ? (
        <>
          <div className="mint-container">
            <Mint />
          </div>
          <CurrentListingsAssetCard />
        </>
      ) : (
        <p>Please sign in to mint an NFT or use the marketplace.</p>
      )}
    </main>
  );
}

export default Home;
