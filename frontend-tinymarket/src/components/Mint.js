import { useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  principalCV,
  PostConditionMode
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

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
        setMinted(true);  // Update minted state here
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
        window.alert("NFT mint failed");
      },
    });
  }
  

  /*
  const getNft = useCallback(async () => {
    if (minted) {
      try {
        const options = {
          contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          contractName: "sip009-nft",
          functionName: "get-token-uri",
          network: new StacksMocknet(),
          functionArgs: [uintCV(1)],
          senderAddress: userSession.loadUserData().profile.stxAddress.testnet
        };
  
        const result = await callReadOnlyFunction(options);
        console.log(result);
        
        if (result.value) {

        // using fetch to retrieve data
        // fetch(`https://${result.value.value.data}`)
        // .then(res => res.json())
        // .then ((output) => {
        //   console.log("Metadata:", output)
        //   setSrc(output.image);
        // })

          // using fleek helper to retrieve data
          const myFile = await fleekStorage.getFileFromHash({
            hash: 'bafybeigi4zxlzz6wmqrgazeccbenctvhdn5bw7o7qlwfvqo7g5alij4bda'
          });
          console.log("MY FILE", myFile);
          setSrc(myFile.image);
        }
      } catch (error) {
        window.alert("Error fetching NFT:", error);

      }
    }
  });

    console.log(src);
    
  useEffect(() => {
    getNft();
  }, [minted])
*/


  if (!userSession.isUserSignedIn()) {
    return null;
  }
  
  return (
    <div>
      {!minted &&
        <div>
          <p>Mint Another Ape!</p>
          <button className="MintButton" onClick={() => mint()}>
            Mint Ape NFT 🐵
          </button>
        </div>  
      }
      {minted && 
        <div>
          <img alt="another ape" height="500px" width="500px" />
        </div>
      }
    </div>
  ); 
};

export default Mint;
