import React, { useState } from 'react';

function AssetPurchase() {
  const [purchaseMethod, setPurchaseMethod] = useState('purchase'); // State to track selected purchase method

  const handlePurchaseMethodChange = (event) => {
    setPurchaseMethod(event.target.value); // Update state based on selected method
  };

  return (
    <main>
      <div className="container">
        <h1>Purchase NFT</h1>
        <div className="nft-details">
          <div className="nft-image">
            <img src="stacks.png" alt="NFT Image" id="nftImage" />
          </div>
          <div className="nft-form">
            <h2 id="nftName">NFT Name</h2>
            <form id="purchaseForm">
              <div className="form-group">
                <label htmlFor="purchaseMethod">Purchase Method</label>
                <select
                  id="purchaseMethod"
                  name="purchaseMethod"
                  value={purchaseMethod}
                  onChange={handlePurchaseMethodChange}
                >
                  <option value="purchase">Purchase</option>
                  <option value="swap">Swap</option>
                </select>
              </div>
              <div className="form-row">
                {purchaseMethod === 'purchase' && (
                  <div className="form-group">
                    <label htmlFor="purchasePrice">Purchase Price</label>
                    <input
                      type="text"
                      id="purchasePrice"
                      name="purchasePrice"
                      placeholder="0.00 BTC"
                    />
                  </div>
                )}
                {purchaseMethod === 'swap' && (
                  <div className="form-group">
                    <label htmlFor="swapNFT">Swap</label>
                    <button type="button" id="swapNFT">
                      Choose NFT
                    </button>
                  </div>
                )}
              </div>
              <button type="submit">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AssetPurchase;