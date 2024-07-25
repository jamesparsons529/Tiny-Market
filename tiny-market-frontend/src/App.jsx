import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button.jsx';
import { UserCard } from './components/user-card.jsx';
import { NetworkToggle } from './components/network-toggle.jsx';

function Contents() {
  return (
    <>
      <div className={'navbar'}>
        <div class="left-section">
          <UserCard />
          <a href="index.html">Tiny Market</a>
        </div>
        <div class="menu-toggle">
          <img src="menu-icon.svg" alt="Menu" width="30px"/>
        </div>
        <nav class="menu">
          <ul>
            <li><a href="browse.htm">Browse</a></li>
            <li><a href="sell.htm">Sell</a></li>
            <li><a href="index.html">Home</a></li>
          </ul>
          <WalletConnectButton />
        </nav>
      </div>
      <div id="content">
        <h1>Tiny Market</h1>
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

export default function App() {
  return (
    <MicroStacks.ClientProvider
      appName={'React + micro-stacks'}
      appIconUrl={reactLogo}
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}
