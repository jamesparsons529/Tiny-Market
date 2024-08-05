import { WalletConnectButton } from './wallet-connect-button.jsx';
import { UserCard } from './user-card.jsx';

export const NavBar = () => {
  return (
    <div className={'navbar'}>
        <div class="left-section">
          <UserCard />
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
};
