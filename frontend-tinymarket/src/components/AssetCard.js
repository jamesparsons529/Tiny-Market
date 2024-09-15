import React, { useState, useEffect } from 'react';
import { UserSession } from "@stacks/connect"; 
export const userSession = new UserSession();

function AssetCard() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve the STX address from the user session
  const stxAddress = userSession.loadUserData().profile.stxAddress.mainnet;

  // Fetch NFTs for the user's Stacks address
  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);

        // Fetch NFTs from the Hiro Stacks API
        const response = await fetch(
          `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${stxAddress}`
        );
        const data = await response.json();
        console.log(data);
        
        // Check if data exists and set it to state
        if (data.results && data.results.length > 0) {
          setNfts(data.results);
        } else {
          console.log('No NFTs found for this address.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    }

    fetchNFTs();
  }, [stxAddress]); // Dependency on the user's Stacks address

  return (
    <div>
      <main id="home-container">
        <div className="NFTCard">
          <main className="browse-container">
            <div className="nft-grid">
              {loading ? (
                <p>Loading NFTs...</p>
              ) : nfts.length > 0 ? (
                nfts.map((nft, index) => (
                  <div className="nft-item" key={index}>
                    <img src={nft.value.repr.replace('u', '')} alt={nft.asset_identifier} />
                    <h2>{nft.asset_identifier}</h2>
                    <p>NFT Contract: {nft.contract_address}</p>
                    <p>Token ID: {nft.value.repr.replace('u', '')}</p>
                    <div className="nft-buttons">
                      <button className="buy-now">Buy Now</button>
                      <button className="swap">Swap</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No NFTs found for this address.</p>
              )}
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}

export default AssetCard;




// import React from 'react';
 

// function AssetCard() {
//     return (
//       <div>

//       <main id="home-container">
//         <div class="NFTCard">
//           <main class="browse-container">
//             <div class="nft-grid">
//               <div class="nft-item">
//                 <img src="future.jpg" alt="Future"/>
//                 <h2>Future</h2>
//                 <p>Artist and Blurb</p>
//                 <div class="nft-price">0.22BTC</div>
//                 <div class="nft-price-usd">US$13,382.11</div>
//                 <div class="nft-floor-price">Floor price for this collection is 0.1991 BTC</div>
//                 <div class="nft-buttons">
//                   <button class="buy-now">Buy Now</button>
//                   <button class="swap">Swap</button>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </main> 
//       </div>
//     );
//   }

//   export default AssetCard;