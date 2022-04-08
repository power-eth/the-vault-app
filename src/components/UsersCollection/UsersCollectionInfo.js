import React, { useState } from 'react';
import data2 from '../../data2';
import './UsersCollection.css';
import { ethers, BigNumber } from 'ethers';
import nftContract from '../../artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json';



function UsersCollectionInfo() {
    const [userNfts, setUserNfts] = useState(data2);

    async function displayUserNfts() {
       // ERC 721 NFT Contract Instance //
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const contractNft = new ethers.Contract(nftContract, nftContract.abi, provider);
       const userNftBalance = await contractNft.getBalanceOf(0x33fF13AC66Cf7A09B51B7F8ab8e5cCE66fdbe49A);
       console.log('user nfts: ', userNftBalance);

    }
    
    return (
        <>
            <h3 className='job'> My NFTs:</h3>
            <div className="collection">
              {userNfts.map((nft) => {
                const { title, number, image, id } = nft;
                return (
                  <article key={id} className='collection-element'>
                      <div className="image-container">
                        <div className="collection-info">
                          <input type='checkbox'/>
                          <h4 className='author'>{id}. {title} #{number}</h4>
                        </div>
                        <img  src={image} alt={title}/> 
                      </div>
                      
                  </article>
                )
            })}
            </div>
            <button>Deposit</button>
            
        </>
        
      );
}

export default UsersCollectionInfo;