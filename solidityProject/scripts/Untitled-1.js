hre = require('hardhat');
const ethers = require('ethers');
require('dotenv').config();

async function main() {


    const url = process.env.RINKEBY_URL;

    let artifacts = await hre.artifacts.readArtifact("dInvestmentFund");

    const provider = new ethers.providers.JsonRpcProvider(url);

    let privateKey = process.env.PRIVATE_KEY;

    let wallet = new ethers.Wallet(privateKey, provider);

    let contract_address = "0xF99291f5cbC5AcA6872ebC7cF2e52005E1E45165";

    const deployedContract = new ethers.Contract(contract_address, artifacts.abi, wallet);

    await deployedContract.buyIn({value: ethers.utils.parseEther('0.02'), gasLimit: 10 ** 7});
    await deployedContract.voteBuyAndStake(true, {gasLimit: 10 ** 7});

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });