const ethers = require('ethers');
require("dotenv").config();

async function main() {

  // singular function ABI construction
  // no need to know entire contract ABI!
  let ABI = [
    "function changeX(uint _x)"
  ];

  // create Interface
  let iface = new ethers.utils.Interface(ABI);

  // construct calldata using encodeFunctionData
  // change the number argument!
  let calldata = iface.encodeFunctionData("changeX", [99]);

  // log manually-constructed calldata
  // should be: function signature + 0-padding + function arguments
  console.log(calldata);

  // connect to a JSON RPC endpoint
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY_URL);
  

  // create a new wallet with a simple private key
  const wallet = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY, provider);

  // use getStorageAt to see value BEFORE function call
  console.log(await provider.getStorageAt("0x31824Cf323FAc905ab13369281b93295279C39DA", 0));

  let tx = await wallet.sendTransaction({
    to: "0x0B6264A3f63ab9463C28279FD4fB6E083Fc317E0", // address of contract we want to interact with
    data: calldata, // pass in manually-constructed calldata
  });

  // wait for the tx to get mined
  await tx.wait();

  console.log("Transaction hash: " + tx.hash);

  // value should now be different!
  console.log(await provider.getStorageAt("0x31824Cf323FAc905ab13369281b93295279C39DA", 0));
}

main();