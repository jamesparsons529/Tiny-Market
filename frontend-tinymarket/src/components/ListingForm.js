import React, { useState, useEffect } from 'react';
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import { 
  AnchorMode, 
  principalCV, 
  uintCV, 
  tupleCV, 
  FungibleConditionCode,
  makeStandardSTXPostCondition 
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ListingForm = () => {
  const { doContractCall } = useConnect();
  const [tokenId, setTokenId] = useState('');
  const [expiry, setExpiry] = useState('');
  const [price, setPrice] = useState('');
  const [blockHeight, setBlockHeight] = useState(null);

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch(`https://stacks-node-api.testnet.stacks.co/v2/info`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging
        setBlockHeight(data.stacks_tip_height);
      } catch (error) {
        console.error("Error fetching block height:", error);
      }
    };
  
    fetchBlockHeight(); // Initial fetch
  
    const intervalId = setInterval(() => {
      console.log("Fetching block height..."); // Debugging
      fetchBlockHeight();
    }, 60000); // Fetch every 60 seconds
  
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenId || !expiry || !price) {
      window.alert("Please fill in all fields.");
      return;
    }

    console.log("Token ID:", tokenId);
    console.log("Expiry:", expiry);
    console.log("Price:", price);

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
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
      onFinish: (data) => {
        console.log("onFinish:", data);
        window.alert("Asset listed successfully!");
        setTokenId('');
        setExpiry('');
        setPrice('');
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
        window.alert("Asset listing failed.");
      },
      onError: (error) => {
        console.error("Error during contract call:", error);
        window.alert("An error occurred while listing the asset. Please try again.");
      }
    });
  };

  return (
    <div className="container">
      <h1>Sell or Swap</h1>
      <div className="nft-details">
        <div className="nft-image">
          <img src="stacks.png" alt="NFT Image" id="nftImage"/>
        </div>
        <div className="nft-form">
          <h2 id="nftName">NFT Name</h2>
          <p>Current Block Height: {blockHeight !== null ? blockHeight : "Loading..."}</p>
          <form id="sellForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="token-id">Select NFT Token Id:</label>
              <select 
                id="token-id" 
                name="token-id"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              >
                <option value="">Select Token ID</option>
                <option value="1">u1</option>
                <option value="2">u2</option>
                <option value="3">u3</option>
              </select>
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
              <label htmlFor="expiry">Expiry Date</label>
              <select 
                id="expiry" 
                name="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              >
                <option value="">Select expiry</option>
                <option value="1">1 hour</option>
                <option value="12">12 hours</option>
                <option value="24">1 day</option>
                <option value="72">3 days</option>
                <option value="168">7 days</option>
                <option value="10000000">31 days</option>
              </select>
            </div>
            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
