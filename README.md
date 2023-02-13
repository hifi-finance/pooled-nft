# Pooled NFT

Pooled NFT is a protocol that enables fractionalizing NFTs into fungible ERC-20 tokens.

## Overview

Pooled NFT consists of a collection of smart contracts for wrapping and unwrapping NFTs as ERC-20 tokens. The smart contracts work with both the ERC-721 and the ERC-1155 standards. The smart contract naming convention follows the following formats:

- `<TOKEN_STANDARD>PoolFactory`
- `<TOKEN_STANDARD>VaultFactory`
- `<TOKEN_STANDARD>Pool`
- `<TOKEN_STANDARD>Vault`

Where `Pool` or `Vault` represent two modes of handling user NFTs and issuing ERC-20 tokens.

### {Pool,Vault}Factory

A smart contract that is responsible for creating and registering new pools/vaults. Factories deploy their child smart contracts via `CREATE2`, which enables computing the pool/vault smart contract address deterministically at the client side using only the seed as input. An example for logic that could be used to compute a `CREATE2` address could be found [here](https://github.com/hifi-finance/pooled-nft/blob/f88dcf807c6f8d6c5561f19ff59986051a91a9c4/test/shared/utils.ts#L8).

### Pool

Represents a shared store of NFTs which operates as follows:

- Any user can deposit NFTs to the pool in order to have an equivalent amount of the pool ERC-20 token minted and sent to their wallet address.
- Any user can pull out any NFT from the pool by trading in an equivalent amount of the pool ERC-20 token to be burnt by the pool.
- Any user can swap NFTs they hold in their wallet with an equivalent number of the same collection NFTs that are in the pool.

### Vault

Represents a private store of NFTs which operates as follows:

- Any user can deposit to their vault in order to have the vault ERC-20 token minted and sent to their wallet address.
- No user can pull out an NFT from another user's vault. Only the same user is able to unlock their NFT from the vault by trading in the vault ERC-20 token to be burned by the vault and have their locked NFT(s) released.

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

To deploy and verify the factory smart contract(s), you would need to run the following line:

```bash
$ yarn hardhat deploy:contract:<TOKEN_STANDARD>-{pool,vault}-factory --confirmations 5 --verify true
```

Replacing `TOKEN_STANDARD` with the appropriate standard (i.e., `erc721` or `erc1155`). And replacing `{pool,vault}` by either `pool` or `vault`.

## License

[GPLv3](./LICENSE.md) © Mainframe Group Inc.
