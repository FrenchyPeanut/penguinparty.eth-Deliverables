import { ethers } from "hardhat";
import { Signer, Wallet, constants, Contract } from 'ethers';
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { WrappedDelegatedUni } from "../typechain/WrappedDelegatedUni";
import WrappedDelegatedUniArtifact from '../artifacts/contracts/penguin-party-v1-core/WrappedDelegatedUni.sol/WrappedDelegatedUni.json';
import { Erc20 } from "../typechain/ERC20";
import ERC20Artifact from '../artifacts/contracts/uniswap-v2-core/ERC20.sol/ERC20.json';

chai.use(solidity);
const { expect, assert } = chai;
// For debug only: const log = console.log;

describe("WrappedDelegatedUni", () => {
  let wrappedDelegatedUni: WrappedDelegatedUni;
  let UniERC20: Erc20;
  let signers: Signer[];
  const transferAmount = ethers.utils.parseUnits('2', 18);
  const initialSupplyUNI = ethers.utils.parseUnits('1000000000', 18);

  before(async () => {
    signers = await ethers.getSigners();

    UniERC20 = (await deployContract(
        signers[0],
        ERC20Artifact,
        [initialSupplyUNI]
      )) as Erc20;

    wrappedDelegatedUni = (await deployContract(
      signers[0],
      WrappedDelegatedUniArtifact,
      ['Penguin Party Shrimp', '🦐']
    )) as WrappedDelegatedUni;

  });

  describe('Deployment', () => {
    it('should deploy the UNI Token with a proper contract address', async () => {
      expect(UniERC20.address).to.properAddress;
    });
    it('should deploy the Shrimp Token with a proper contract address', async () => {
      expect(wrappedDelegatedUni.address).to.properAddress;
    });
  });

  describe('kek', () => {

  });
});
