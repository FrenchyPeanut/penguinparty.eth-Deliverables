import { ethers } from "hardhat";
import { Signer, Wallet, constants, Contract } from 'ethers';
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { FishToken } from "../typechain/FishToken";
import FishTokenArtifact from '../artifacts/contracts/penguin-party-v1-core/FishToken.sol/FishToken.json';

chai.use(solidity);
const { expect, assert } = chai;
// For debug only: const log = console.log;

describe("FishToken", () => {
  let fishToken: FishToken;
  let signers: Signer[];
  const initialSupply = ethers.utils.parseUnits('200000', 18);
  const transferAmount = ethers.utils.parseUnits('1000', 18);

  before(async () => {
    signers = await ethers.getSigners();

    fishToken = (await deployContract(
      signers[0],
      FishTokenArtifact,
      ['Penguin Party Fish', '🐟']
    )) as FishToken;
  });

  describe('Deployment', () => {
    it('should deploy the FishToken with a proper contract address', async () => {
      expect(fishToken.address).to.properAddress;
    });

    it('should mint the initial supply', async () => {
      expect(await fishToken.totalSupply()).to.eq(0);
      await fishToken.mint(await signers[0].getAddress(), initialSupply);
      expect(await fishToken.totalSupply()).to.eq(initialSupply);
      assert.equal(parseInt(ethers.utils.formatUnits(await fishToken.balanceOf(await signers[0].getAddress()), 18)), parseInt(ethers.utils.formatUnits(initialSupply, 18)), `User FishToken Balance should be ${ethers.utils.formatUnits(initialSupply, 18)}.`);
    });
  });

  describe('Transfer', () => {
    it('should transfer the requested amount', async () => {
      assert.equal(parseInt(ethers.utils.formatUnits(await fishToken.balanceOf(await signers[0].getAddress()), 18)), parseInt(ethers.utils.formatUnits(initialSupply, 18)), `User FishToken Balance should be ${ethers.utils.formatUnits(initialSupply, 18)}.`);
      expect(parseInt(ethers.utils.formatUnits(await fishToken.balanceOf(await signers[1].getAddress()), 18))).to.eq(0);
      await expect(
        fishToken.transfer(await signers[1].getAddress(), transferAmount)
      ).to.emit(fishToken, 'Transfer')
        .withArgs(await signers[0].getAddress(), await signers[1].getAddress(), transferAmount);
      expect(parseInt(ethers.utils.formatUnits(await fishToken.balanceOf(await signers[1].getAddress()), 18))).to.eq(parseInt(ethers.utils.formatUnits(transferAmount, 18)));
      expect(parseInt(ethers.utils.formatUnits(await fishToken.balanceOf(await signers[0].getAddress()), 18))).to.eq(parseInt(ethers.utils.formatUnits(initialSupply, 18)) - parseInt(ethers.utils.formatUnits(transferAmount, 18)));
    })
  });
});
