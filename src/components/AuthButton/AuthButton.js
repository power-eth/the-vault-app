import React, { useState } from "react";


const AuthButton = ({ accounts, setAccounts }) => {

  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

    return (
      <>
      {isConnected ? (
        <p>{accounts}</p>
      ) : (
        <button onClick={connectAccount}>Connect</button>
      )}
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