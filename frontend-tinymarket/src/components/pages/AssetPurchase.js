import React from 'react';
import Mint from '../Mint';

import PurchaseForm from '../purchaseForm';
import CurrentListings from '../CurrentListings';

function AssetPurchase() {


  return (
    <main>
        <div>
            <h1>Asset Purchase</h1>
            <p>Buy an asset from the TinyMarket</p>
            <PurchaseForm />
        </div>
        <div>
            <CurrentListings />
        </div>
    </main>
  );
}

export default AssetPurchase;