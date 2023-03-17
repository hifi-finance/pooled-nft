# Pooled NFT

Pooled NFT is a protocol that enables fractionalizing NFTs into fungible ERC-20 tokens. This is useful in connecting NFT collections to DeFi. For example, adding liquidity to a uniswap market. ERC-20 tokens are fully backed 1:1 by specific NFT collections. There are no fees.

![](./images/pooledNFT.gif)

## Overview

Pooled NFT consists of a collection of smart contracts for wrapping and unwrapping NFTs as ERC-20 tokens. The smart contracts work with the ERC-721 standard.

### ERC721PoolFactory

A smart contract that is responsible for creating and registering new pools. Factories deploy their child smart contracts via `CREATE2`, which enables computing the pool smart contract address deterministically at the client side using only the seed as input. An example for logic that could be used to compute a `CREATE2` address could be found [here](https://github.com/hifi-finance/pooled-nft/blob/f88dcf807c6f8d6c5561f19ff59986051a91a9c4/test/shared/utils.ts#L8).

### ERC721Pool

Represents a shared store of NFTs which operates as follows:

- Any user can deposit NFTs to the pool in order to have an equivalent amount of the pool ERC-20 token minted and sent to their wallet address.
- Any user can pull out any NFT from the pool by trading in an equivalent amount of the pool ERC-20 token to be burnt by the pool.
- Any user can swap NFTs they hold in their wallet with an equivalent number of the same collection NFTs that are in the pool.

## Development

### Pre Requisites

You will need the following software on your machine:

- [Git](https://git-scm.com/downloads)
- [Node.Js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

In addition, familiarity with [Solidity](https://soliditylang.org/), [TypeScript](https://typescriptlang.org/) and [Hardhat](https://hardhat.org) is requisite.

### Set Up

Install the dependencies:

```bash
$ yarn install
```

Create a `.env` file and follow the `.env.example` file to add the requisite environment variables. Now you can start making changes.

### Deployment

To deploy and verify the factory smart contract, you would need to run the following line:

```bash
$ yarn hardhat deploy:contract:erc721-pool-factory --confirmations 5 --verify true
```

## License

[GPLv3](./LICENSE.md) © Hifi Labs.
