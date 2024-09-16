import React, { useState } from 'react';
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

  // State for form values
  const [tokenId, setTokenId] = useState('');
  const [expiry, setExpiry] = useState('');
  const [price, setPrice] = useState('');

  const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
  const postConditionCode = FungibleConditionCode.LessEqual;
  const postConditionAmount = 50 * 1000000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // Contract address
      contractName: "tiny-market", // Contract name
      functionName: "list-asset",
      functionArgs: [
        principalCV("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip009-nft"), // NFT asset contract principal
        tupleCV({
          'token-id': uintCV(parseInt(tokenId)),
          'expiry': uintCV(parseInt(expiry)),
          'price': uintCV(parseInt(price)),
        }),
      ],
      postConditions: [
        makeStandardSTXPostCondition(
          postConditionAddress,
          postConditionCode,
          postConditionAmount
        )
      ],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window.alert("Asset listed successfully!");
        // Clear the input fields by resetting the state
        setTokenId('');
        setExpiry('');
        setPrice('');
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
        window.alert("Asset listing failed.");
      },
      onError: (error) => {
        // Log and handle errors
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
                <option value="744">31 days</option>
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
