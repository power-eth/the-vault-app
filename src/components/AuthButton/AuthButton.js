import React, { useState } from "react";

const AuthButton = ({ defaultAccount, setDefaultAccount, errorMessage, setErrorMessage, isLoggedIn, setIsLoggedIn }) => {
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  // Establish Logged in logic
  const loginStatus = () => {
    if(isLoggedIn !== true) {
      console.log('You are not logged in');
    } else {
      
    }
  }
  // Main connection handler
  const connectWalletHandler = () => {
    // Make sure user installed Metamask
    if(window.ethereum) {
          // Check isLoggedIn bool
          if(isLoggedIn == false) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
              accountChangedHandler(result[0]);
              connectWallet();
            });
          } else {
            (isLoggedIn == true && defaultAccount == null) ? disconnectWallet(): window.alert('Please disconnect through Metamask first.');
          }
    } else { //Else user alerted to install Metamask
      setErrorMessage('You need to install Metamask');
      window.alert(errorMessage);
    }
  }
  // Connects address to site
  const connectWallet = () => {
    setConnButtonText('Disconnect');
    setIsLoggedIn(true);
  }
  // Disconnects address from site
  const disconnectWallet = () => {
    setConnButtonText('Connect Wallet');
    setIsLoggedIn(false);
  }

  // Updates default account
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  }
  // Handles account change
  window.ethereum.on("accountsChanged", async (accounts) => {
    setDefaultAccount(accounts[0]);
  });
  

    return (
      <>
          <button onClick={connectWalletHandler}>{connButtonText}</button>
          <br/>
          <h5>Address connected: {defaultAccount} </h5>
          <h5>Logged In : {isLoggedIn ? "true" : "false"}</h5>
        
      </>
    );
};

export default AuthButton;