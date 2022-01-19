const ethers = require('ethers');
hre = require('hardhat');
require('dotenv').config();


async function main(){
const url = process.env.RINKEBY_URL;
let artifacts = await hre.artifacts.readArtifact("dInvestmentFund");
const provider = new ethers.providers.JsonRpcProvider(url);
let privateKey = process.env.PRIVATE_KEY;
let wallet = new ethers.Wallet(privateKey, provider);

async function deploy(owners_array, numberOfConf, buyInAmount){

  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  let dif = await factory.deploy(owners_array, numberOfConf, ethers.utils.parseEther(buyInAmount), {gasLimit : 10**7});
  dif.deployed(); 
  console.log("Contract deployed at: ", dif.address);

  return dif
}



//  deploy contract with 2 owners, 0.5 ETH buyIn and 2 required votes
async function test1(){

    const owners_array = ["0x0b1e46e42c49f450aF30769C4BC2a3CF0425A8c1", "0xfE0b8d9aC9CCb38574dfA98751256F479A9e888C"];
    let numberOfConf = 2;
    let buyInAmount = "0.5";

    const dIF = await deploy(owners_array, numberOfConf, buyInAmount);
    
    return dIF;
}

// await test1();


// define contract object for communication
const address = " ";
const dIF = new ethers.Contract(address, artifacts.abi, wallet);




// try to vote before buyIn
async function test2(){
    await dIF.voteBuyAndStake(true,{gasLimit : 10**7});
}

// await test2();




// buyIn with too little and required amount
async function test3(){
    await dIF.buyIn({value : ethers.utils.parseEther("0.01") ,gasLimit : 10**7});
    await dIF.buyIn({value : ethers.utils.parseEther("0.5") ,gasLimit : 10**7});
}

// await test3();





// send list of coins to invest in
async function test4(){
    const LINK_ADDRESS = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'; // LINK COIN
    const UNISWAP_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // UNISWAP COIN
    const DAI_ADDRESS = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'; // DAI COIN

    let name_array = ['DAI', 'UNISWAP', 'LINK'];
    let address_array = [DAI_ADDRESS, UNISWAP_ADDRESS, LINK_ADDRESS];

    let tx = await dIF.addCoins(name_array,address_array);
    await tx.wait();
}

// await test4();





// show the token balance in our portfolio before any purchase
// await showBalance();





// vote  for buy coins, Kilian will reject 
async function test5(){
    await dIF.voteBuyAndStake(true,{gasLimit : 10**7});
}

// await test5();





// vote  for buy coins, Kilian will agree
async function test6(){
    await dIF.voteBuyAndStake(true,{gasLimit : 10**7});
}
// await test6();




// show the token balance after purchase and staking
// STAKING: we send the bought coins to the exchange to earn profits and get liquidity coins 
// liquidity coins can be swapped back against staked coins + earned profits
// await showBalance();






// Kilian and I both agree to cashOut and destroy the contract
async function test7(){
    await dIF.voteCashOutAndDestroy(true,{gasLimit : 10**7});
}

// await test7();







async function showBalance(){
    let fundinfo = await dIF.showAssetList({gasLimit : 10**7});
    console.log("YOUR ASSETS ARE");
    console.log("COINNAMES: ", fundinfo._coin_names);
    console.log("BALANCE: ", fundinfo._coin_assets.map(x => x.toString()));
    console.log("LIQUIDITY COINS: ", fundinfo._liquidity_coin_assets.map(x => x.toString()));
    console.log("...");
}





}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });