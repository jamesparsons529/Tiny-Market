import React, { useState, useEffect } from 'react';
import { callReadOnlyFunction } from '@stacks/transactions'; // Import the necessary library functions
import { StacksTestnet } from "@stacks/network";
import { uintCV, addressFromHashMode } from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const CurrentListings = ({ contractAddress, contractName }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stxAddress = userSession.loadUserData().profile.stxAddress.mainnet;

  // Function to get the last listing ID
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
      return Number(result.value.value); // Get the number from the result
    } catch (error) {
      console.error('Error fetching last listing ID:', error);
      setError(error.message);
    }
  };

  // Function to fetch individual listing by ID
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

  // Fetch all active listings
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
            });
          } else {
            console.warn(`Invalid listing data for ID ${id}`);
          }
        } else {
          console.warn(`No listing found for ID ${id}`);
        }
      }
      console.log('Fetched Listings:', fetchedListings);
      setListings(fetchedListings);
    } catch (error) {
      console.error('Error fetching all listings:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
    <div>
      <h2>Current NFT Listings</h2>
      {listings.length === 0 ? (
        <p>No listings available</p>
      ) : (
        <ul>
          {listings.map((listing, index) => (
            <li key={index}>
              Listing ID: {listing.listingId} - Token ID: {listing.tokenId} - Price: {listing.price} STX - Maker: {listing.makerAddress} - Expiry: {listing.expiry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentListings;
