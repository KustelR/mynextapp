import CryptoJS from "crypto-js";


async function generatePasswordHash(password, salt) {
    return await new Promise((resolve) => {
        resolve(CryptoJS.PBKDF2(password, salt, {keySize: 32, iterations: 20000}).toString())
    })
}

export {
    generatePasswordHash
}