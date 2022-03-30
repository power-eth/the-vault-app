const hre = require("hardhat");

async function main() {
  const TheVault = await hre.ethers.getContractFactory("TheVault");
  const theVault = await TheVault.deploy();

  await theVault.deployed();

  console.log("TheVault deployed to:", theVault.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
