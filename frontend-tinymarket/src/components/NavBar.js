import React from 'react';
import WalletConnectButton from './ConnectWallet';

function NavBar() {
    return (
        <div className={'navbar'}>
            <div class="left-section">
            <a href="index.html">Tiny Market</a>
            </div>
            <div class="menu-toggle">
            <img src="menu-icon.svg" alt="Menu" width="30px"/>
            </div>
            <nav class="menu">
            <a href="browse.htm">Browse</a>
            <a href="sell.htm">Sell</a>
            <a href="index.html" class="active1">Home</a>
            <WalletConnectButton />
            </nav>
        </div>
    );
  }

  export default NavBar;