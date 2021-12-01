/**
 * BlowFish algorithm implementation
 * @author Wojciech Piorecki
 */
let crypto = require('crypto');
const fs = require('fs');
const iv = "spamshog";
const key = "spamshog";
const path = "cos10.txt"
const path2 = "decrypted.txt"

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
//let text = "2378dc9wf_178203";
/**
 *
 * @param filePath takes a path to file
 * @return {string} returns encrypted text in file
 */
encrypt = (filePath) => {
    let decipher = crypto.createCipheriv('bf-cbc', key, iv);
    decipher.setAutoPadding(false);
    let encrypted = decipher.update(filePath, 'utf-8', "base64");
    encrypted += decipher.final('base64');
    return encrypted
}
/**
 * writes encrypted text to a file
 */
(() => {
    try{
        fs.writeFileSync(path,encrypt(string));
        console.log("Successfuly encrypted file")
    }catch (error){
        console.log(error);
    }

})()


let encryption = encrypt(string);
console.log("encrypted: " + encryption);

let string2 = readFile(path)

/**
 *
 * @param filePath takes a path to a file
 * @return {string} returns decrypted text
 */
decrypt = (filePath) => {
    let decipher = crypto.createDecipheriv('bf-cbc', key, iv);
    decipher.setAutoPadding(false);
    let decrypted = decipher.update(filePath,'base64',"utf-8")
    decrypted += decipher.final('utf-8');
    return decrypted;
}
let decryption = decrypt(string2);
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
// writeDecryptedStringToAFile(path2,decryption);

console.log("decrypted: " + decryption)