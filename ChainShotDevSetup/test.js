const ethers = require('ethers');
const { Wallet, utils } = ethers;

const wallet1 = new Wallet.createRandom();


const promise = wallet1.signTransaction({
    value: utils.parseEther('1.0'),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
    gasLimit: 21000,
    gasPrice: 10 ** 10
});

promise.then(console.log); // 0xf86c80...fe19be (220 chars)