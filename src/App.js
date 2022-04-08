import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import UsersCollection from './components/UsersCollection/UsersCollection';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import './App.css';


function App() {
  //const [accounts, setAccounts] = useState([]);
  // Wallet Connection Vars
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container">
      <Navbar
        defaultAccount = {defaultAccount}
        setDefaultAccount = {setDefaultAccount}
        errorMessage = {errorMessage}
        setErrorMessage = {setErrorMessage}
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn}
      />
      <Header 
        defaultAccount = {defaultAccount}
        setDefaultAccount = {setDefaultAccount}
      />
      {/* <UsersCollection
        defaultAccount = {defaultAccount}
      /> */}
      <About/> 
      <Footer/>
    </div>
  );
}
export default App;