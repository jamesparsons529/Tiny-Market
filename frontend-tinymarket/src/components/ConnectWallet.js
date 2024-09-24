import React from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  return (
    <div className="nav-left">
      {userSession.isUserSignedIn() ? (
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
      ) : (
        <button className="Connect" onClick={authenticate}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
