import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import theVault from '../../artifacts/contracts/TheVault.sol/TheVault.json';
import nftContract from '../../artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json';
import TopCollections from "../TopCollections/TopCollections";
import HeaderInfo from "./HeaderInfo"
import './Header.css'

const theVaultAddress = "0x68afBaAe6371f81Ac2b0334F11CF5Dd5eceF28e7";

const abi = [
    // Read-Only Functions
    "function getArrayElements() public view returns(Nft[] memory)"
];

function Header({}) {
    const [nftContractAddress, setNftContractAddress] = useState('');
    const [nftTokenId, setNftTokenId] = useState(0);
    const [randomNft, setRandomNft] = useState('');

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function showVaultContents() {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(theVaultAddress, theVault.abi, provider);
            console.log(contract.mainVault);
        }
    }

     // Deposit Function //
     async function handleDeposit() {
        if(window.ethereum) {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // Main Vault Contract Instance //
            const contract = new ethers.Contract(theVaultAddress, theVault.abi, signer);
            // ERC 721 NFT Contract Instance //
            const contractNft = new ethers.Contract(nftContractAddress, nftContract.abi, signer);

            const signerAddress = await signer.getAddress();
            const approveState = await contractNft.getApproved(nftTokenId);
            const isOwner = await contractNft.ownerOf(nftTokenId);
            try {              
                if( isOwner !== signerAddress) {
                    console.log('You do not own this token.');
                } else if(approveState == 0x0000000000000000000000000000000000000000) {
                    const tokenApprove = await contractNft.approve(theVaultAddress, nftTokenId);
                    console.log('response: ', tokenApprove);
                    await tokenApprove.wait();
                    const response = await contract.deposit(nftTokenId, nftContractAddress);
                    console.log('response: ', response);
                } else {
                    const response = await contract.deposit(nftTokenId, nftContractAddress);
                    console.log('response: ', response);
                  
                  }                                        
               
            } catch(err) {
                console.log('error: ', err);
            }
        }
    }

    // Withdraw Function
    async function handleWithdraw() {
        if(window.ethereum) {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(theVaultAddress, theVault.abi, signer);
            try {
                const response = await contract.withdraw();
                console.log('response: ', response);  
                console.log(contract.withdraw.randomNft);
            } catch(err) {
                console.log('error: ', err);
            }
        }
    }

    return ( 
        <>
            <div className="main-container">
                <div>
                    <HeaderInfo />
                    <button onClick={handleWithdraw}>Roll</button> 
                    <div>
                            <input 
                                type="text" 
                                required
                                value={nftTokenId}
                                onChange={(e) => setNftTokenId(e.target.value)}
                                placeholder='Enter Token Id' 
                            />
                            <input 
                                type="text"
                                required 
                                value={nftContractAddress}
                                onChange={(e) => setNftContractAddress(e.target.value)} 
                                placeholder='Enter Contract Address' />
                            <button onClick={handleDeposit}>Deposit</button>
                            <div>tokenId: {nftTokenId} contractAddress:{nftContractAddress}</div>

                            <button onClick={showVaultContents}>show vault contents</button>
                   
                    </div>
                </div>
                <TopCollections />
            </div>
                
        </>
        
     );
}

export default Header;