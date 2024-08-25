import type { NextPage, GetServerSidePropsContext } from 'next';
import styles from '../styles/Home.module.css';
import { WalletConnectButton } from '../components/wallet-connect-button';
import { NetworkToggle } from '../components/network-toggle';
import { UserCard } from '../components/user-card';
import { getDehydratedStateFromSession } from '../common/session-helpers';

import { useState, useEffect } from 'react';

import { StacksMainnet } from '@stacks/network'; // Import the StacksMainnet network
import { callReadOnlyFunction } from '@stacks/transactions'; // Import the callReadOnlyFunction from @stacks/transactions
import { uintCV } from '@stacks/transactions'; // Import Clarity values like uintCV for the function arguments

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      dehydratedState: await getDehydratedStateFromSession(ctx),
    },
  };
}

const checkConnection = async () => {
  try {
    const network = new StacksMainnet();
    
    const options = {
      contractAddress: 'SP2CS8P5CAFSWXPSC241H48WN00S1Q1EBD467JMHS', // Replace with your contract address
      contractName: 'your-contract-name', // Replace with your contract name
      functionName: 'get-name', // Replace with your function name
      functionArgs: [],
      network,
      senderAddress: 'SPJ5K4610DSFMEX6FFHW447BHBKW8WFX8Z2PNGFD', // Replace with a valid address
    };

    const result: any = await callReadOnlyFunction(options);
    console.log(result);
    
    if (result.value.type === 'ok') {
      console.log('Connected successfully:', result.value.value.data);
    } else {
      console.log('Connection failed:', result.value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const Home: NextPage = () => {
  const [nftImageUrl, setNftImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkConnection();
    const network = new StacksMainnet();
    console.log(network.coreApiUrl);
    async function fetchNftImageUrl() {
      try {
        const options = {
          contractAddress: 'SP2CS8P5CAFSWXPSC241H48WN00S1Q1EBD467JMHS',
          contractName: 'sip009-nft',
          functionName: 'get-token-uri',
          functionArgs: [
            uintCV(1142), // Use Clarity uint for the token ID
          ],
          network: new StacksMainnet(),
          senderAddress: 'SPJ5K4610DSFMEX6FFHW447BHBKW8WFX8Z2PNGFD',
        };

        const result: any = await callReadOnlyFunction(options);
        // Extract the URI from the Clarity result
        const tokenUri = result.value;

        // Check if the response is an 'optional' Clarity value
        if (tokenUri.type === 'some') {
          setNftImageUrl(tokenUri.value.data);
        } else {
          setNftImageUrl(null);
        }
      } catch (error) {
        console.error('Error fetching NFT metadata:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNftImageUrl();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <UserCard />
        <WalletConnectButton />
        <NetworkToggle />

        {loading ? (
          <p>Loading NFT image...</p>
        ) : nftImageUrl ? (
          <img src={nftImageUrl} alt="NFT Image" />
        ) : (
          <p>No NFT image found</p>
        )}
      </main>
    </div>
  );
};


export default Home;
