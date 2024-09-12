import React from 'react';
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
import { callReadOnlyFunction, uintCV, getCVType, deserializeCV } from "@stacks/transactions";
import { userSession } from "./ConnectWallet";  

const GetLastTokenIdButton = () => {
  const { doContractCall } = useConnect();

  const handleButtonClick = async () => {
    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "sip009-nft",
      functionName: "get-last-token-id",
      network: new StacksMocknet(),
      functionArgs: [],
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    };
  
    try {
      const result = await callReadOnlyFunction(options);
      console.log(result);
      const lastTokenId = result.value.value.toString();
      console.log("Last Token ID:", lastTokenId);
    } catch (error) {
      console.error("Error calling get-last-token-id:", error);
    }
  };
  

  return (
    <button onClick={handleButtonClick}>
      Get Last Token ID
    </button>
  );
};

export default GetLastTokenIdButton;
