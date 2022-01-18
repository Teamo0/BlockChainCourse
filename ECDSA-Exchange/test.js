const key = ec.genKeyPair();
// encode the entire public key as a hexadecimal string
const publicKey = key.getPublic().encode('hex');
