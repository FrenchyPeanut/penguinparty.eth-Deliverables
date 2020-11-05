import { ethers } from "hardhat";
import { Signer } from 'ethers';
import { min } from "bn.js";
const log = console.log;

async function main() {
  const signers: Signer[] = await ethers.getSigners();
  const initialSupply = ethers.utils.parseEther('200000');

  const fishTokenFactory = await ethers.getContractFactory("FishToken");

  let fishToken = await fishTokenFactory.deploy('Penguin Party Fish', '🐟');

  log(`FishToken deployment transaction hash: ${fishToken.deployTransaction.hash}`);

  await fishToken.deployed();

  log(`FishToken deployed address: ${fishToken.address}`);

  const minting = await fishToken.mint(await signers[0].getAddress(), initialSupply);
  await minting.wait();
  log(`FishToken minting transaction hash: ${minting.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
