import React from 'react';
import PurchaseForm from '../purchaseForm';
import CurrentListings from '../CurrentListings';
import '../css/AssetPurchase.css';

function AssetPurchase() {
  return (
    <main className="asset-purchase-container">
      <div className="asset-purchase-header">
        <h1>Fulfil Purchase</h1>
        <p>Buy an asset from the TinyMarket</p>
      </div>
      <div className="purchase-form-container">
        <PurchaseForm />
      </div>
      <div className="current-listings-container">
        <CurrentListings />
      </div>
    </main>
  );
}

export default AssetPurchase;
