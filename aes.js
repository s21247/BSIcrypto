/**
 * AES algorithm implementation
 * @author Wojciech Piorecki
 */

const crypto = require('crypto');
const fs = require('fs');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const path = "cos8.txt";
const path2 = "decrypted.txt";

/**
 *
 * @param text takes a path to file
 * @return {object} returns object: iv and encryptedData
 */
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

/**
 *
 * @param filePath takes a path to a file
 * @return {string} returns decrypted text
 */
function decrypt(filePath) {
    let iv = Buffer.from(filePath.iv, 'hex');
    let encryptedText = Buffer.from(filePath.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

/**
 *
 * @param filePath takes a path to a file
 * @return {string} returns a string text from a file
 */
function readFile(filePath){
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(err);
    }
}
let string = readFile(path);
let hw = encrypt(string)
console.log(hw);

/**
 * writes encrypted text to a file
 */
(() => {
    try{
        fs.writeFileSync(path,JSON.stringify(hw));
        console.log("Successfuly encrypted file")
    }catch (error){
        console.log(error);
    }

})()
let decrypted = decrypt(hw)

/**
 *
 * @param path takes a path to a file
 * @param text takes a text that is written to file
 */
function writeDecryptedStringToAFile(path,text){
    try {
        fs.writeFileSync(path,text)
    }catch(error){
        console.log(error);
    }
}
//writeDecryptedFile(path2,decrypted)

console.log("decrypted: " + decrypted)