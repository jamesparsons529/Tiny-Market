import React, { useState } from 'react';
import AssestCard from '../AssetCard';
import Mint from '../Mint';
import Whitelist from '../Whitelist';
import ListingForm from '../ListingForm';


function Home() {
  // State to trigger a refresh of the NFT list
  const [refresh, setRefresh] = useState(false);

  // Define the onMint function to trigger a refresh
  const handleMint = () => {
    console.log("NFT minted parent callback triggered");
    setRefresh(prev => !prev); // Toggle the refresh state5
  };

  return (
    <div>
      <div>
        <AssestCard />
      </div>
      <div>
        <Mint/>
      </div>
      <div>
        <Whitelist/>
      </div>
      <div>
        <ListingForm/>
      </div>
    </div>
  );
}

export default Home;
