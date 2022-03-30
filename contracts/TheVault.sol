pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT


import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract TheVault{

    struct Nft {
        uint tokenId;
        address contractAddress;
        address depositedBy;
        uint timestamp;
    }
    
    // Required for ERC721 transfering
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data) public view returns(bytes4){
        return this.onERC721Received.selector;
    }

    // Array holding NFTs
    Nft[] public mainVault; 

    // map amount of nfts staked
    mapping(address => uint) public amountStaked;

    // Hard coded random number (this returns 1-100)
    function randMod(uint _modulus) internal view returns(uint) {
    //uint randNonce = 0;
    //randNonce++;
    //return uint(keccak256(abi.encode(block.timestamp, msg.sender, mainVault))) % _modulus;
    return uint(keccak256(abi.encodePacked(msg.sender, block.timestamp))) % _modulus;
  }
    
    // Print rand number based on length of array
    function printRandNum() public view returns(uint) {
        uint randNumber = randMod(mainVault.length);
        return randNumber;
    }
    

    // Remove assets from array
    function removeAssetFromArray(uint _index) internal {
    require(_index < mainVault.length, "Not enough NFTs available.");
        mainVault[_index] = mainVault[mainVault.length-1];
        mainVault.pop(); // Implicitly recovers gas from last element storage
    }

    // User deposit their NFT and is pushed to mainVault array
    function deposit(uint _tokenId, address _contractAddress) public {
        IERC721 nftContract = IERC721(_contractAddress);
        nftContract.safeTransferFrom(msg.sender, address(this), _tokenId);
        mainVault.push(Nft(_tokenId, _contractAddress, msg.sender, block.timestamp));
        amountStaked[msg.sender]++;
    }

    // Print elements in array
    function getArrayElements() public view returns(Nft[] memory) {
            return mainVault;
        }
    

    function withdraw() public {
        // random number
        uint rand = randMod(mainVault.length);
        // points to rand index of mainVault array
        Nft storage randomNft = mainVault[rand];
        // create interface for randomNft's CA
        IERC721 nftContract = IERC721(randomNft.contractAddress);
       // goes to users wallet
        nftContract.safeTransferFrom(address(this), msg.sender, randomNft.tokenId);
        // remove from array
        removeAssetFromArray(rand);
        
    }
    // Process:
    // Chainlink VRF runs random # func and stores in variable randNumb
     // to support receiving ETH by default

} 

