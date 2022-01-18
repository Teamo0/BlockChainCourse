const ethers = require('ethers');
const solc = require('solc');
const ganache = require("ganache-core");

// create wallet and connect to ganache provider
// provider initialised with account balance for wallet
const randomWallet = ethers.Wallet.createRandom();
const ganacheProvider = ganache.provider({ accounts: [{
    balance: ethers.utils.parseEther("10").toString(),
    secretKey: randomWallet.privateKey,
}]});

const provider = new ethers.providers.Web3Provider(ganacheProvider);
const wallet = randomWallet.connect(provider);


async function deploy(){

// smart contract in solidity as string
const content = `
    pragma solidity ^0.8.11;
    contract Contract {
        uint public x;
        constructor(uint _x) {
            x = _x;
        }
    }
`;

// compile code with solc library
const input = {
    language: 'Solidity',
    sources: { 'contract.sol': { content } },
    settings: { outputSelection: { '*': { '*': ['*'] } } }
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

/* deploy contract to ganache blockchain
const { Contract: { abi, evm: { bytecode }}} = output.contracts['contract.sol'];
const factory = new ethers.ContractFactory(abi, bytecode.object, wallet);
const contract = await factory.deploy(5);
*/

// different way to deploy contract
const { Contract } = output.contracts['contract.sol'];
const factory = ethers.ContractFactory.fromSolidity(Contract, wallet);
const contract = await factory.deploy(5);


// interact with smart contract on the blockchain 
const x = await contract.x();
console.log(x.toString()); // 5

}

deploy();