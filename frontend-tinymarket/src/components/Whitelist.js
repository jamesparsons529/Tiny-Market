import { useCallback, useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
import {
  AnchorMode,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  principalCV,
  boolCV
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const Whitelist = () => {
  const { doContractCall } = useConnect();

  const isWhitelisted = () => {
    // Adjusted parameters
    const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"; // Principal address of your contract
    const whitelisted = true; // boolean value

    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = 50 * 1000000;

    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: contractAddress,
      contractName: "tiny-market",
      functionName: "set-whitelisted",
      functionArgs: [
        principalCV (contractAddress), 
        boolCV(whitelisted) // pass boolean value
      ],
      postConditions: [
        makeStandardSTXPostCondition(
          postConditionAddress,
          postConditionCode,
          postConditionAmount
        )
      ],
      onFinish: (data) => {
        window.alert("sip009-nft Whitelisted Successfully");
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
        window.alert("NFT whitelist failed");
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }
  
  return (
    <div>
      <button className="MintButton" onClick={() => isWhitelisted()}>
        Whitelist sip009-nft 
      </button>
    </div>   
  ); 
};

export default Whitelist;
