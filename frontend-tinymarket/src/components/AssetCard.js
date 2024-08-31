import React from 'react';
 

function AssetCard() {
    return (
      <div>

      <main id="home-container">
        <div class="NFTCard">
          <main class="browse-container">
            <div class="nft-grid">
              <div class="nft-item">
                <img src="future.jpg" alt="Future"/>
                <h2>Future</h2>
                <p>Artist and Blurb</p>
                <div class="nft-price">0.22BTC</div>
                <div class="nft-price-usd">US$13,382.11</div>
                <div class="nft-floor-price">Floor price for this collection is 0.1991 BTC</div>
                <div class="nft-buttons">
                  <button class="buy-now">Buy Now</button>
                  <button class="swap">Swap</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main> 
      </div>
    );
  }

  export default AssetCard;