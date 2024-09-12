import React, { useState } from 'react';
import AssestCard from '../AssetCard';
import Mint from '../Mint';
import Whitelist from '../Whitelist';
import ListingForm from '../ListingForm';
import GetLastTokenIdButton from '../totalNFTButton';

function Home() {
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
      <div>
        <GetLastTokenIdButton/>
      </div>
    </div>
  );
}

export default Home;
