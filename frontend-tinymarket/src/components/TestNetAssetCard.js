import React, { useState, useEffect } from 'react';
import { UserSession } from "@stacks/connect";
import './TestNetAssetCard.css'; 

export const userSession = new UserSession();

function TestNetAssetCard() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve the STX address from the user session
  const stxAddress = userSession.loadUserData().profile.stxAddress.testnet;

  // Fetch NFTs for the user's Stacks Testnet address
  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);

        // Fetch NFTs from the Hiro Stacks Testnet API
        const response = await fetch(
          `https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${stxAddress}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setNfts(data.results);
          console.log('NFTs:', nfts);
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
    <div className="listings-container">
      <h2>My Testnet NFTs</h2>
      {loading ? (
        <p>Loading NFTs...</p>
      ) : nfts.length > 0 ? (
        <div className="listing-cards">
          {nfts.map((nft, index) => (
            <div className="card" key={index}>
              <img
                src={"/images/nft-image.png"} 
                alt='Testnet NFT Image' 
                className="nft-image"
              />
              <div className="card-details">
                <p className="nft-contract">{nft.contract_address}</p>
                <p className="nft-description">NFT Contract:</p>
                <p className="nft-contract-small">{nft.contract_address}</p>
                <p className="token-id">Token ID: {nft.value.repr.replace('u', '')}</p>
                <div className="actions">
                  <button className="buy-button">Buy Now</button>
                  <button className="swap-button">Swap</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found for this address.</p>
      )}
    </div>
  );
}

export default TestNetAssetCard;
