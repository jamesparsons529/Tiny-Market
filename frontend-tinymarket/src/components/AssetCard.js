import React, { useState, useEffect } from 'react';
import { UserSession } from "@stacks/connect"; 
import { StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, uintCV } from '@stacks/transactions';
export const userSession = new UserSession();

function AssetCard() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve the STX address from the user session
  const stxAddress = userSession.loadUserData().profile.stxAddress.mainnet;

  // Function to extract principal and contract name from asset identifier
  const extractPrincipalAndContract = (assetIdentifier) => {
    const [fullContractName] = assetIdentifier.split('::');
    const [principal, contractName] = fullContractName.split('.');
    return { principal, contractName };
  };

  // Function to convert IPFS URL to HTTP URL
  const convertIpfsUrl = (ipfsUrl) => {
    return ipfsUrl.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/');
  };

  // Fetch NFTs for the user's Stacks address
  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);

        // Fetch NFTs from the Hiro Stacks API
        const response = await fetch(
          `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${stxAddress}`
        );
        const data = await response.json();
        
        // Check if data exists and set it to state
        if (data.results && data.results.length > 0) {
          const nftsWithDetails = await Promise.all(data.results.map(async (nft) => {
            const { principal, contractName } = extractPrincipalAndContract(nft.asset_identifier);
            const tokenId = nft.value.repr.replace('u', ''); // Extract token ID

            console.log(`Principal: ${principal}`);
            console.log(`Contract Name: ${contractName}`);
            console.log(`Token ID: ${tokenId}`);

            // Define the contract and function to call
            const network = new StacksMainnet();
            const tokenUriFunction = 'get-token-uri';
            const functionArgs = [uintCV(tokenId)]; // Pass Token ID

            // Call the contract function
            try {
              const result = await callReadOnlyFunction({
                contractAddress: principal,
                contractName: contractName,
                functionName: tokenUriFunction,
                functionArgs: functionArgs,
                network,
                senderAddress: stxAddress
              });
              const tokenUri = result.value.value.data || '';
              console.log(contractName + ` Token URI: ${tokenUri}`);

              // Convert IPFS URL to HTTP URL
              const ipfsImageUrl = tokenUri.startsWith('ipfs://') ? convertIpfsUrl(tokenUri) : tokenUri;

              // Fetch data from IPFS and return the image URL
              async function fetchDataFromIpfs() {
                try {
                  const response = await fetch(ipfsImageUrl);
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  const fetchedImageUrl = data.image;
                  const imageUrl = convertIpfsUrl(fetchedImageUrl);
                  console.log(contractName + ' Image URL:', imageUrl);
                  return imageUrl;
                } catch (error) {
                  console.error('Error fetching data from IPFS:', error);
                  return null;
                }
              }
              
              // Call the function to fetch data and get the image URL
              const imageUrl = await fetchDataFromIpfs();
              
              return {
                ...nft,
                principal,
                contractName,
                tokenId,
                imageUrl
              };
            } catch (error) {
              console.error('Error calling contract function:', error);
              return {
                ...nft,
                principal,
                contractName,
                tokenId,
                imageUrl: ''
              };
            }
          }));
          setNfts(nftsWithDetails);
          console.log('NFTs:', nftsWithDetails);
        } else {
          console.log('No NFTs found for this address.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    }

    fetchNFTs();
  }, [stxAddress]); 

  return (
    <div>
      <main id="home-container">
        <div className="NFTCard">
          <main className="browse-container">
            <div className="nft-grid">
              {loading ? (
                <p>Loading NFTs...</p>
              ) : nfts.length > 0 ? (
                nfts.map((nft, index) => (
                  <div className="nft-item" key={index}>
                    <img src={nft.imageUrl} alt={`NFT ${index}`} />
                    <h2>{nft.asset_identifier}</h2>
                    <p>NFT Contract: {nft.principal}.{nft.contractName}</p>
                    <p>Token ID: {nft.tokenId}</p>
                    <div className="nft-buttons">
                      <button className="buy-now">Buy Now</button>
                      <button className="swap">Swap</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No NFTs found for this address.</p>
              )}
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}

export default AssetCard;
