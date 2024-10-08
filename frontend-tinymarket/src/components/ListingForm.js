import React, { useState, useEffect } from 'react';
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import { 
  AnchorMode, 
  principalCV, 
  uintCV, 
  tupleCV,
  PostConditionMode
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import './css/ListingForm.css';

const ListingForm = () => {
  const { doContractCall } = useConnect();
  const [tokenId, setTokenId] = useState('');
  const [expiry, setExpiry] = useState('');
  const [price, setPrice] = useState('');
  const [blockHeight, setBlockHeight] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loadingNfts, setLoadingNfts] = useState(true);

  const fetchNFTs = async (principal) => {
    try {
      const response = await fetch(
        `https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${principal}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }
      const data = await response.json();
      setNfts(data.results);
      setLoadingNfts(false);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch(`https://stacks-node-api.testnet.stacks.co/v2/info`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlockHeight(data.stacks_tip_height);
      } catch (error) {
        console.error("Error fetching block height:", error);
      }
    };

    fetchBlockHeight(); // Initial fetch
    const intervalId = setInterval(() => {
      fetchBlockHeight();
    }, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const principal = userData.profile.stxAddress.testnet;
      fetchNFTs(principal);
    }
  }, []);

  const handleNftSelection = (e) => {
    const selectedTokenId = e.target.value;
    setTokenId(selectedTokenId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenId || !expiry || !price) {
      window.alert("Please fill in all fields.");
      return;
    }

    // Validate expiry
    if (blockHeight !== null && parseInt(expiry) <= blockHeight + 50) {
      window.alert("Expiry date must be greater than the current block height by at least 50.");
      return;
    }

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Allow,
      contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH",
      contractName: "tiny-market",
      functionName: "list-asset",
      functionArgs: [
        principalCV("ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH.sip009-nft"),
        tupleCV({
          'token-id': uintCV(parseInt(tokenId)),
          'expiry': uintCV(parseInt(expiry)),
          'price': uintCV(parseInt(price)),
        }),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        window.alert("Asset listed successfully!");
        setTokenId('');
        setExpiry('');
        setPrice('');
      },
      onCancel: () => {
        window.alert("NFT Listing Failed.");
      },
      onError: (error) => {
        console.error("Error during contract call:", error);
        window.alert("An error occurred while listing the NFT. Please try again.");
      }
    });
  };

  return (
    <div className="listing-form">
      <h1 class = "listings-title">Sell or Swap</h1>
      <div className="container">
        <h2 class = "listings-subtitle">List your NFT for sale or swap</h2>
        <div className="nft-details">
          <div className="nft-image">
            {tokenId && (
              <img
                src={"/images/nft-image.png"}
                alt="NFT Image"
                className="selected-nft-image"
              />
            )}
          </div>
          <div className="nft-form">
            <h2 id="nftName">NFT Name</h2>
            <p>Current Block Height: {blockHeight !== null ? blockHeight : "Loading..."}</p>
            <form id="sellForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="token-id">Select NFT Token Id:</label>
                {loadingNfts ? (
                  <p>Loading NFTs...</p>
                ) : (
                  <select
                    id="token-id"
                    name="token-id"
                    value={tokenId}
                    onChange={handleNftSelection}
                    required
                  >
                    <option value="">Select an NFT</option>
                    {nfts.map((nft) => {
                      const tokenIdStr = nft.value.repr.replace(/[^\d]/g, '');
                      const tokenIdInt = parseInt(tokenIdStr, 10);
                      return (
                        <option key={tokenIdStr} value={tokenIdInt}>
                          Token ID: {tokenIdInt}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Sell Price (in STX)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price in STX"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry Height</label>
                <input 
                  type="number" 
                  id="expiry" 
                  name="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="Enter expiry height"
                  required
                />
              </div>
              <button class = "submit" type="submit">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
