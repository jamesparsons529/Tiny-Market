import React, { useState, useEffect } from 'react';
import { useConnect } from "@stacks/connect-react";
import { callReadOnlyFunction, uintCV, principalCV, AnchorMode, PostConditionMode } from '@stacks/transactions';
import { StacksTestnet } from "@stacks/network";
import { userSession } from "./ConnectWallet"; 
import './css/CurrentListingsAssetCard.css';

const CurrentListingsAssetCard = ({ contractAddress, contractName }) => {
  const { doContractCall } = useConnect();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stxAddress = userSession.loadUserData().profile.stxAddress.mainnet;

  const fetchLastListingId = async () => {
    try {
      const options = {
        network: new StacksTestnet(),
        contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH",
        contractName: "sip009-nft",
        functionName: 'get-last-token-id',
        functionArgs: [],
        senderAddress: stxAddress,
      };
      
      const result = await callReadOnlyFunction(options);
      return Number(result.value.value);
    } catch (error) {
      console.error('Error fetching last listing ID:', error);
      setError(error.message);
    }
  };

  const fetchListing = async (listingId) => {
    try {
      const options = {
        network: new StacksTestnet(),
        contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH",
        contractName: "tiny-market",
        functionName: 'get-listing',
        functionArgs: [uintCV(listingId)],
        senderAddress: stxAddress,
      };
      
      const result = await callReadOnlyFunction(options);
      return result.value ? result.value : null;
    } catch (error) {
      console.error(`Error fetching listing ID ${listingId}:`, error);
      setError(error.message);
    }
  };

  const fetchAllListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const lastListingId = await fetchLastListingId();
      if (isNaN(lastListingId)) {
        throw new Error('Invalid last listing ID');
      }
      const fetchedListings = [];

      for (let id = 0; id <= lastListingId; id++) {
        const listing = await fetchListing(id);
        if (listing) {
          const tokenId = listing.data['token-id']?.value;
          const price = listing.data['price']?.value;
          const makerHash = listing.data['maker']?.address?.hash160;
          const expiry = listing.data['expiry']?.value;

          if (typeof tokenId === 'bigint' && price > 0) {
            fetchedListings.push({
              listingId: id.toString(),
              tokenId: tokenId.toString(),
              price: price.toString(),
              makerAddress: makerHash,
              expiry: expiry ? expiry.toString() : 'Unknown',
              contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH",
            });
          }
        }
      }
      setListings(fetchedListings);
    } catch (error) {
      console.error('Error fetching all listings:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = (listingId) => {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH",
      contractName: "tiny-market",
      functionName: "fulfil-listing-stx",
      functionArgs: [
        uintCV(parseInt(listingId)),
        principalCV("ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH.sip009-nft"),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        console.log("onFinish:", data);
        window.alert("Asset fulfilled successfully!");
        fetchAllListings(); // Refresh listings after purchase
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
        window.alert("Asset fulfillment failed.");
      },
      onError: (error) => {
        console.error("Error during contract call:", error);
        window.alert("An error occurred while fulfilling the asset. Please try again.");
      }
    });
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  if (loading) {
    return <div>Loading listings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listings-container-asset-card">
      <h2 className="listings-title">Current Testnet NFT Listings</h2>
      {listings.length === 0 ? (
        <p>No listings available</p>
      ) : (
        <div className="listing-cards">
          {listings.map((listing, index) => (
            <div className="card" key={index}>
              <img src="/images/nft-image.png" alt="NFT" className="nft-image" />
              <div className="card-details">
                <p className="nft-contract">Stacksies</p>
                <p className="nft-description">NFT Contract:</p>
                <p className="nft-contract-small">{listing.contractAddress}</p>
                <p className="listing-id">Listing ID: {listing.listingId}</p>
                <p className="token-id">Token ID: {listing.tokenId}</p>
                <p className="nft-price">Price: {listing.price} STX</p>
                <div className="actions">
                  <button className="buy-button" onClick={() => handleBuy(listing.listingId)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentListingsAssetCard;
