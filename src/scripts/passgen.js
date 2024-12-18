import CryptoJS from "crypto-js";

async function generatePasswordHash(password, salt) {
  return await new Promise((resolve) => {
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 32,
      iterations: 1,
    }).toString();
    resolve(hash);
  });
}

export { generatePasswordHash };
