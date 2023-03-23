# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2023-03-23

### Added

- New `ERC721Pool` contract, which allows users to deposit and withdraw ERC-721 tokens in exchange for pool tokens. This contract features a new `deposit`, `withdraw` and `withdrawWithSignature` function.
- New `ERC721PoolFactory` contract, which allows users to create new `ERC721Pool` contracts. This contract features a new `createPool` function.

### Changed

- Rename `@hifi-finance/wnft` to `@hifi-finance/pooled-nft`.
- Upgrade to `@openzeppelin/contracts` v4.8.1.

### Removed

- `Vault` contract.
- `VaultFactory` contract.
