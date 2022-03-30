import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import UsersCollection from './components/UsersCollection/UsersCollection';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import './App.css';


function App() {
  const [accounts, setAccounts] = useState([]);
  // Wallet Connection Vars
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [currentContractVal, setCurrentContractVal] = useState(null);

  return (
    <div className="container">
      <Navbar
      accounts = {accounts}
      setAccounts = {setAccounts}
      />
      <Header 
      accounts = {accounts}
      setAccounts = {setAccounts}
      />
      <UsersCollection
      accounts = {accounts}
      />
      <About/> 
      <Footer/>
    </div>
  );
}

export default App;
