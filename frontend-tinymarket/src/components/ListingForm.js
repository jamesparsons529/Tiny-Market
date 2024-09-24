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

const PurchaseForm = () => {
  const { doContractCall } = useConnect();
  const [listingId, setListingId] = useState('');
  const [blockHeight, setBlockHeight] = useState(null);
  const [paymentOption, setPaymentOption] = useState('stx'); // 新增支付選項

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const response = await fetch(`https://stacks-node-api.testnet.stacks.co/v2/info`);
        const data = await response.json();
        setBlockHeight(data.stacks_tip_height);
      } catch (error) {
        console.error("Error fetching block height:", error);
      }
    };

    fetchBlockHeight();
    const intervalId = setInterval(fetchBlockHeight, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listingId) {
      window.alert("Please fill in all fields.");
      return;
    }

    const contractName = paymentOption === 'stx' ? 'fulfil-listing-stx' : 'fulfil-listing-ft'; // 根據支付選項選擇合約

    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH", 
      contractName: "tiny-market",
      functionName: contractName,  // 根據支付選項選擇合約函數
      functionArgs: [
        uintCV(parseInt(listingId)),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        window.alert("Purchase successful!");
        setListingId('');
      },
      onCancel: () => {
        window.alert("Purchase failed.");
      },
      onError: (error) => {
        console.error("Error during contract call:", error);
        window.alert("An error occurred while processing the purchase. Please try again.");
      }
    });
  };

  return (
    <div className="container">
      <h1>Purchase NFT</h1>
      <div className="nft-form">
        <p>Current Block Height: {blockHeight !== null ? blockHeight : "Loading..."}</p>
        <form id="purchaseForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="listing-id">Enter Listing ID:</label>
            <input
              type="number"
              id="listing-id"
              name="listing-id"
              value={listingId}
              onChange={(e) => setListingId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentOption">Choose Payment Option:</label>
            <select 
              id="paymentOption"
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
            >
              <option value="stx">STX</option>
              <option value="sip10-token">Sip10-token</option>
            </select>
          </div>
          <button type="submit">Purchase</button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
