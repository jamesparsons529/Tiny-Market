import React from 'react';
import CurrentListings from '../CurrentListings';
import CancelListingForm from '../CancelListingForm'

function CancelListing() {
  return (
    <main className="asset-purchase-container">
      <div className="asset-purchase-header">
        <h1>Cancel Listing</h1>
        <p>Cancel your listing on Tiny Market</p>
      </div>
      <div className="purchase-form-container">
        <CancelListingForm/>
      </div>
      <div className="current-listings-container">
        <CurrentListings />
      </div>
    </main>
  );
}

export default CancelListing;
