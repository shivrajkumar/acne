import { MD5 } from 'crypto-js';

function encryptMD5(value) {
  return MD5(value.trim().toLowerCase());
}

export default encryptMD5;
