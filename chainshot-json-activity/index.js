const axios = require('axios');

// copy-paste your URL from Alchemy
const ALCHEMY_URL = "https://eth-rinkeby.alchemyapi.io/v2/KoWAq6apbPWekZZCpbVsU87jsVkNEL16";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBlockByNumber",
  params: [
    "0xb443", // block 46147
    false  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(response.data.result);
});