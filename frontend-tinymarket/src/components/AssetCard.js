import React, { useState, useEffect } from 'react';
import { UserSession } from "@stacks/connect"; 
import { StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, uintCV } from '@stacks/transactions';
import './css/AssetCard.css'; 
export const userSession = new UserSession();

function AssetCard() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const stxAddress = userSession.loadUserData().profile.stxAddress.mainnet;

  const extractPrincipalAndContract = (assetIdentifier) => {
    const [fullContractName] = assetIdentifier.split('::');
    const [principal, contractName] = fullContractName.split('.');
    return { principal, contractName };
  };

  const convertIpfsUrl = (ipfsUrl) => {
    return ipfsUrl.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/');
  };

  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${stxAddress}`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const nftsWithDetails = await Promise.all(data.results.map(async (nft) => {
            const { principal, contractName } = extractPrincipalAndContract(nft.asset_identifier);
            const tokenId = nft.value.repr.replace('u', ''); 

            const network = new StacksMainnet();
            const tokenUriFunction = 'get-token-uri';
            const functionArgs = [uintCV(tokenId)];

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

              const ipfsImageUrl = tokenUri.startsWith('ipfs://') ? convertIpfsUrl(tokenUri) : tokenUri;

              async function fetchDataFromIpfs() {
                try {
                  const response = await fetch(ipfsImageUrl);
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  const fetchedImageUrl = data.image;
                  console.log(fetchedImageUrl)
                  const imageUrl = convertIpfsUrl(fetchedImageUrl);
                  return imageUrl;
                } catch (error) {
                  console.error('Error fetching data from IPFS:', error);
                  return null;
                }
              }

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
    <div className="listings-container">
      <h2>My Mainnet NFTs</h2>
      {loading ? (
        <p>Loading NFTs...</p>
      ) : nfts.length > 0 ? (
        <div className="listing-cards">
          {nfts.map((nft, index) => (
            <div className="card" key={index}>
              <img src={nft.imageUrl} alt={`NFT ${index}`} className="nft-image" />
              <div className="card-details">
                <p className="nft-contract">{nft.contractName}</p>
                <p className="nft-description">NFT Contract:</p>
                <p className="nft-contract-small">{nft.principal}</p>
                <p className="token-id">Token ID: {nft.tokenId}</p>
                <div className="actions">
                  <button className="buy-button">Sell Now</button>
                  <button className="swap-button">Swap</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found for this address.</p>
      )}
    </div>
  );
}

export default AssetCard;
