import React, { useState } from 'react';
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
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

  const [nftAssetContract, setNftAssetContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [expiry, setExpiry] = useState('');
  const [price, setPrice] = useState('');

  const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
  const postConditionCode = FungibleConditionCode.LessEqual;
  const postConditionAmount = 50 * 1000000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!nftAssetContract || !tokenId || !expiry || !price) {
      window.alert("Please fill in all fields.");
      return;
    }

    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // Contract address
      contractName: "tiny-market", // Contract name
      functionName: "list-asset",
      functionArgs: [
        principalCV(nftAssetContract), // NFT asset contract principal
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
        window.alert("Asset listed successfully!");
        // Clear the input fields by resetting the state
        setNftAssetContract('');
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nft-asset-contract">NFT Asset Contract Principal:</label>
        <input
          type="text"
          id="nft-asset-contract"
          value={nftAssetContract}
          onChange={(e) => setNftAssetContract(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="token-id">NFT Token ID:</label>
        <input
          type="number"
          id="token-id"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="expiry">Expiry Block Height:</label>
        <input
          type="number"
          id="expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button type="submit">List Asset</button>
    </form>
  );
};

export default ListingForm;