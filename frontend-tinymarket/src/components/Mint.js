import { useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  principalCV,
  PostConditionMode
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import "./Mint.css";

const Mint = () => {
  const { doContractCall } = useConnect();
  const [minted, setMinted] = useState(false);

  const userAddress = userSession.loadUserData().profile.stxAddress.testnet;

  function mint() {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1NWPSRC02Z9A20RHSBGDEDG9H8CHS6ENJ2N3TTH", 
      contractName: "sip009-nft", 
      functionName: "mint",
      functionArgs: [
        principalCV(userAddress),
      ],
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        window.alert("NFT Minted Successfully");
        console.log("onFinish:", data);
        console.log("Transaction ID:", data.txId);
        setMinted(true);  
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
        window.alert("NFT mint failed");
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <div>
        <p>Mint Another Ape!</p>
        <button className="MintButton" onClick={() => mint()}>
          Mint Ape NFT 🐵
        </button>
      </div>
      {minted && (
        <div>
          <p>NFT Minted Successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Mint;
