import React, { useState, useEffect } from 'react';
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import { 
  AnchorMode, 
  principalCV, 
  uintCV, 
  PostConditionMode 
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import './purchaseForm.css'; // Assuming you're adding a CSS file

const PurchaseForm = () => {
  const { doContractCall } = useConnect();
  const [listingId, setListingId] = useState('');
  const [blockHeight, setBlockHeight] = useState(null);

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

    fetchBlockHeight();

    const intervalId = setInterval(() => {
      console.log("Fetching block height...");
      fetchBlockHeight();
    }, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listingId) {
      window.alert("Please fill in all fields.");
      return;
    }

    console.log("Listing ID:", listingId);

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
        setListingId('');
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

  return (
    <div className="purchase-container">
      <h1 className="purchase-title">Fulfill NFT Listing</h1>
      <p className="block-height">Current Block Height: {blockHeight !== null ? blockHeight : "Loading..."}</p>
      <form id="fulfillForm" className="purchase-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="listing-id" className="form-label">Listing ID:</label>
          <input 
            type="number" 
            id="listing-id" 
            name="listing-id"
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            placeholder="Enter Listing ID"
            className="form-input"
            required
          />
        </div> 
        <button type="submit" className="submit-button">Fulfill Listing</button>
      </form>
    </div>
  );
};

export default PurchaseForm;
