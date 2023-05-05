// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract NameResolver {
    function setName(bytes32 node, string memory name) public virtual;
}

bytes32 constant lookup = 0x3031323334353637383961626364656600000000000000000000000000000000;
bytes32 constant ADDR_REVERSE_NODE = 0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2;

//dev https://raw.githubusercontent.com/ensdomains/ens-contracts/master/contracts/reverseRegistrar/ReverseRegistrar.sol
contract ReverseRegistrar is Ownable {
    // ENS public immutable ens;
    NameResolver public defaultResolver;

    // event ReverseClaimed(address indexed addr, bytes32 indexed node);
    event DefaultResolverChanged(NameResolver indexed resolver);

    function setDefaultResolver(address resolver) public onlyOwner {
        require(address(resolver) != address(0), "ReverseRegistrar: Resolver address must not be 0");
        defaultResolver = NameResolver(resolver);
        emit DefaultResolverChanged(NameResolver(resolver));
    }

    function claimForAddr(
        address addr,
        address, /*owner*/
        address /*resolver*/
    ) public pure returns (bytes32) {
        bytes32 labelHash = sha3HexAddress(addr);
        bytes32 reverseNode = keccak256(abi.encodePacked(ADDR_REVERSE_NODE, labelHash));

        //ens.setSubnodeRecord(ADDR_REVERSE_NODE, labelHash, owner, resolver, 0);
        return reverseNode;
    }

    /**
     * @dev Sets the `name()` record for the reverse ENS record associated with
     * the calling account. First updates the resolver to the default reverse
     * resolver if necessary.
     * @param name The name to set for this address.
     * @return The ENS node hash of the reverse record.
     */
    function setName(string memory name) public view returns (bytes32) {
        return setNameForAddr(msg.sender, msg.sender, address(defaultResolver), name);
    }

    function setNameForAddr(
        address addr,
        address owner,
        address resolver,
        string memory /*name*/
    ) public pure returns (bytes32) {
        bytes32 node = claimForAddr(addr, owner, resolver);
        //NameResolver(resolver).setName(node, name);
        return node;
    }

    /**
     * @dev Returns the node hash for a given account's reverse records.
     * @param addr The address to hash
     * @return The ENS node hash.
     */
    function node(address addr) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(ADDR_REVERSE_NODE, sha3HexAddress(addr)));
    }

    /**
     * @dev An optimised function to compute the sha3 of the lower-case
     *      hexadecimal representation of an Ethereum address.
     * @param addr The address to hash
     * @return ret The SHA3 hash of the lower-case hexadecimal encoding of the
     *         input address.
     */
    function sha3HexAddress(address addr) private pure returns (bytes32 ret) {
        assembly {
            for {
                let i := 40
            } gt(i, 0) {

            } {
                i := sub(i, 1)
                mstore8(i, byte(and(addr, 0xf), lookup))
                addr := div(addr, 0x10)
                i := sub(i, 1)
                mstore8(i, byte(and(addr, 0xf), lookup))
                addr := div(addr, 0x10)
            }

            ret := keccak256(0, 40)
        }
    }
}
