# Pooled NFT

Pooled NFT is a protocol that enables fractionalizing NFTs into fungible ERC-20 tokens. This is useful in connecting NFT collections to DeFi. For example, adding liquidity to a uniswap market. ERC-20 tokens are fully backed 1:1 by specific NFT collections. There are no fees.

![](./images/pooledNFT.gif)

## Overview

Pooled NFT consists of a collection of smart contracts for wrapping and unwrapping NFTs as ERC-20 tokens. The smart contracts work with the ERC-721 standard.

### ERC721PoolFactory

A smart contract that is responsible for creating and registering new pools. Factories deploy their child smart contracts via `CREATE2`, which enables computing the pool smart contract address deterministically at the client side using only the seed as input. An example for logic that could be used to compute a `CREATE2` address could be found [here](https://github.com/hifi-finance/pooled-nft/blob/f88dcf807c6f8d6c5561f19ff59986051a91a9c4/test/shared/utils.ts#L8).

### ERC721Pool

Responsible for managing the NFTs and the ERC-20 (Pooled NFT) tokens, and operates as follows:

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

### Integration

The following examples demonstrate how to interact with the factory smart contract to register new pools, or interact with individual pools to initiate deposits or withdrawals.

#### Examples

- How to enumerate through all active pools using the PooledNFT factory smart contract:

```javascript
// To interact with the factory contract, you will need its abi.
// You can find that in the repository or on etherscan.
const pooledNftFactoryAbi = [...]
// The current factory pool address is: 0xb67dc4b5a296c3068e8eec16f02cdae4c9a255e5
const pooledNftFactory = new ethers.Contract(
    "0x...",
    pooledNftFactoryAbi,
    provider
)

const numberOfPools = await pooledNftFactory.allPoolsLength()
for (let i = 0; i < numberOfPools.toNumber(); i++) {
    const pool = await pooledNftFactory.allPools(i)

    // do something with pool here
}
```

- How to deposit an NFT into a pool:

```javascript
// Add the ABI of the pool contract
const pooledNftPoolAbi = [...]
// Add the address of the pool contract
const poolAddress = "0x..."

// Add the ABI of the NFT contract
const nftAbi = [...]
// Add the address of the NFT contract
const nftAddress = "0x..."

const pooledNftPool = new ethers.Contract(
    poolAddress,
    pooledNftPoolAbi,
    signer
)

const nftContract = new ethers.Contract(nftAddress, nftAbi, signer)

// Add all token ids that you want to deposit into the pool
// You may also use only one token id in the array
const idsToDeposit = [1, 2, 3]

// Approving the pool to transfer the NFTs
for (const id of idsToDeposit) {
    console.log(id)
    const approveTx = await nftContract.approve(pooledNftPool.address, id)
    await approveTx.wait()
}

// Depositing the NFTs into the pool
const depositTx = await pooledNftPool.deposit(idsToDeposit)
await depositTx.wait()
```

- How to extract a specific NFT from a pool:

```javascript
// Add the ABI of the pool contract
const pooledNftPoolAbi = [...]
// Add the address of the pool contract
const poolAddress = "0x..."

const pooledNftPool = new ethers.Contract(poolAddress, pooledNftPoolAbi, signer)

// Add all token ids that you want to extract from the pool
const idsToWithdraw = [1, 2, 3]

// Depositing the NFTs into the pool
const withdrawTx = await pooledNftPool.withdraw(idsToWithdraw)
await withdrawTx.wait()
```

## License

[GPLv3](./LICENSE.md) © Hifi Labs.
