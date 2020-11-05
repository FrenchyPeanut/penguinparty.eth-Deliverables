## Using this Project

Clone this repository, then install the dependencies with `npm install`. Build everything with `npm run build`. 
https://hardhat.org/.

## Available Functionality

### Set Node version

`nvm use`

### Build Contracts

`npm run compile`

### Generate TypeChain Typings

`npm run build`

### Run Contract Tests

`npm run test`

Note: As is, the tests fail on purpose. This is to show the Solidity stack traces that hardhat enables!

### Run Coverage Report for Tests

`npm run coverage`

### Deploy locally

`npx hardhat run --network localhost scripts/deploy.ts`

### Deploy to Ethereum

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:

`npx hardhat run --network rinkeby scripts/deploy.ts`

### Verify on Etherscan

Add Etherscan API key to `buidler.config.ts`, then run:

`npx hardhat verify-contract --contract-name Counter --address <DEPLOYED ADDRESS>`

## Enhancement Wish List

- Better migrations strategy (hardhat working on this)

PRs and feedback welcome!
