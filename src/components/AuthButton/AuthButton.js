import React, { useState } from "react";


const AuthButton = ({ defaultAccount, setDefaultAccount, errorMessage, setErrorMessage }) => {
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {
    if(window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(result => {
        accountChangedHandler(result[0]);
        setConnButtonText('Wallet Connected');
      });
    } else {
      setErrorMessage('You need to install Metamask');
      window.alert(errorMessage);
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  }

  window.ethereum.on("accountsChanged", async (accounts) => {
    setDefaultAccount(accounts[0]);
  });
  

    return (
      <>
          <button onClick={connectWalletHandler}>{connButtonText}</button>
          <br/>
          <h5>Address connected: {defaultAccount} </h5>
        
      </>
    );

  /* const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  if (isLoggedIn === true) {
    return (
      <div className='button-container'>
        <button className='random-btn' onClick={handleLogout}>Logout</button>
      </div>
    
  )} else {
    return (
    <div className='button-container'>
      <button className='random-btn' onClick={handleLogin}>Login</button>
    </div>
    )} */
};

export default AuthButton;