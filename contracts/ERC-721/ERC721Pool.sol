// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@ensdomains/ens-contracts/contracts/registry/IReverseRegistrar.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "./IERC721Pool.sol";
import "./ERC20Wnft.sol";

/// @title ERC721Pool
/// @author Hifi
contract ERC721Pool is IERC721Pool, ERC20Wnft {
    using EnumerableSet for EnumerableSet.UintSet;

    /// PUBLIC STORAGE ///

    /// @inheritdoc IERC721Pool
    bool public poolFrozen;

    /// INTERNAL STORAGE ///

    /// @dev The asset token IDs held in the pool.
    EnumerableSet.UintSet internal holdings;

    /// CONSTRUCTOR ///

    constructor() ERC20Wnft() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// MODIFIERS ///

    /// @notice Ensures that the pool is not frozen.
    modifier notFrozen() {
        if (poolFrozen) {
            revert ERC721Pool__PoolFrozen();
        }
        _;
    }

    /// @notice Ensures that the caller is the factory.
    modifier onlyFactory() {
        if (msg.sender != factory) {
            revert ERC721Pool__CallerNotFactory({ factory: factory, caller: msg.sender });
        }
        _;
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721Pool
    function holdingAt(uint256 index) external view override returns (uint256) {
        return holdings.at(index);
    }

    /// @inheritdoc IERC721Pool
    function holdingsLength() external view override returns (uint256) {
        return holdings.length();
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721Pool
    function deposit(uint256[] calldata ids) external override notFrozen {
        if (ids.length == 0) {
            revert ERC721Pool__InsufficientIn();
        }
        for (uint256 i; i < ids.length; ) {
            uint256 id = ids[i];
            require(holdings.add(id));
            IERC721(asset).transferFrom(msg.sender, address(this), id);
            unchecked {
                ++i;
            }
        }
        _mint(msg.sender, ids.length * 10**18);
        emit Deposit(ids, msg.sender);
    }

    /// @inheritdoc IERC721Pool
    function rescueLastNFT(address to) external override onlyFactory {
        if (holdings.length() != 1) {
            revert ERC721Pool__MustContainExactlyOneNFT();
        }
        uint256 lastNFT = holdings.at(0);
        require(holdings.remove(lastNFT));
        IERC721(asset).transferFrom(address(this), to, lastNFT);
        poolFrozen = true;
        emit PoolFrozen();
    }

    /// @inheritdoc IERC721Pool
    function setENSName(address registrar, string memory name) external override onlyFactory returns (bytes32) {
        bytes32 nodeHash = IReverseRegistrar(registrar).setName(name);
        emit ENSNameSet(registrar, name, nodeHash);
        return nodeHash;
    }

    /// @inheritdoc IERC721Pool
    function withdraw(uint256[] calldata ids) public override notFrozen {
        if (ids.length == 0) {
            revert ERC721Pool__InsufficientIn();
        }
        _burn(msg.sender, ids.length * 10**18);
        for (uint256 i; i < ids.length; ) {
            uint256 id = ids[i];
            require(holdings.remove(id));
            IERC721(asset).transferFrom(address(this), msg.sender, id);
            unchecked {
                ++i;
            }
        }
        emit Withdraw(ids, msg.sender);
    }

    /// @inheritdoc IERC721Pool
    function withdrawWithSignature(
        uint256[] calldata ids,
        uint256 deadline,
        bytes memory signature
    ) external override {
        permitInternal(ids.length * 10**18, deadline, signature);
        withdraw(ids);
    }
}
