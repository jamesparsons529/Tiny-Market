import React, { useState } from 'react';
import Mint from '../Mint';
import { userSession } from '../ConnectWallet'; 
import CurrentListingsAssetCard from '../CurrentListingsAssetCard';

function Home() {
  const isUserSignedIn = userSession.isUserSignedIn(); 

  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <div>
        <div>
          {isUserSignedIn ? (
            <>
              <Mint />
              <CurrentListingsAssetCard />
            </>
          ) : (
            <p>Please sign in to mint an NFT.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
