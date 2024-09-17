import React, { useState, useEffect } from 'react';
import { UserSession } from "@stacks/connect"; 

export const userSession = new UserSession();

function TestNetNFTSList() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve the STX address from the user session
  const stxAddress = userSession.loadUserData().profile.stxAddress.testnet; // Change to Testnet address

  // Fetch NFTs for the user's Stacks address
  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);

        // Fetch NFTs from the Hiro Stacks Testnet API
        const response = await fetch(
          `https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${stxAddress}` // Change to Testnet endpoint
        );
        const data = await response.json();
        
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
  }, [stxAddress]); 

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

export default TestNetNFTSList;