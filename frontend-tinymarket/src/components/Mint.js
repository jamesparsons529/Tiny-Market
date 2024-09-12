import { useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMocknet } from "@stacks/network";
import {
  AnchorMode,
  principalCV,
  makeStandardSTXPostCondition,
  FungibleConditionCode
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const Mint = () => {
  const { doContractCall } = useConnect();
  const [minted, setMinted] = useState(false);
  const [src, setSrc] = useState('');

  const userAddress = userSession.loadUserData().profile.stxAddress.testnet;

  function mint() {
    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = 50 * 1000000;
  
    doContractCall({
      network: new StacksMocknet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "sip009-nft",
      functionName: "mint",
      functionArgs: [
        principalCV(userAddress),
      ],
      postConditions: [
        makeStandardSTXPostCondition(
          postConditionAddress,
          postConditionCode,
          postConditionAmount
        )
      ],
      onFinish: (data) => {
        window.alert("NFT Minted Successfully");
        console.log("onFinish:", data);
        console.log("Transaction ID:", data.txId); // Logs the txId specifically
        
        // You can create a link to view it on the blockchain explorer:
        console.log("Explorer URL:", `http://localhost:8000/txid/${data.txId}?chain=testnet`);
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
          <img src={src} alt="another ape" height="500px" width="500px" />
        </div>
      }
    </div>
  ); 
};

export default Mint;
