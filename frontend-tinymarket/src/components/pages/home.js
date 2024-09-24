import React, { useState } from 'react';
import Mint from '../Mint';
import { userSession } from '../ConnectWallet'; // Assuming this is where userSession is managed

function Home() {
  const isUserSignedIn = userSession.isUserSignedIn(); // Check if the user is signed in

  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <div>
        <div>
          {isUserSignedIn ? (
            // Display the Mint component if the user is signed in
            <Mint />
          ) : (
            // Show a message or an alternative component when not signed in
            <p>Please sign in to mint an NFT.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
