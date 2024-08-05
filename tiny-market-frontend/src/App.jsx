import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as MicroStacks from '@micro-stacks/react';
import { NetworkToggle } from './components/network-toggle.jsx';
import { NFTCard } from './components/nft-card.jsx';
import { NavBar } from './components/navbar.jsx';

function Contents() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div id="content">
        <NFTCard />
      </div>
      <div class="footer">
        <NetworkToggle />
        <p
          style={{
            display: 'block',
            marginTop: '40px',
          }}
        >
        </p>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <MicroStacks.ClientProvider
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}
