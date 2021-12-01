/**
 * DES algorithm implementation
 * @author Wojciech Piorecki
 */
const crypto = require('crypto');
const fs = require('fs');
const algorithm = 'des-ecb';
const password = 'some password';
// use a hex key here
const key = Buffer.from("d0e276d0144890d3", "hex");
const path = "cos5.txt"
const path2 = "decrypted.txt"

const cipher = crypto.createCipheriv(algorithm, key, null);
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
let string = readFile(path)

/**
 *
 * @param string takes a path to file
 * @return {string} returns encrypted text in file
 */
encrypt = (string) => {
    let encrypted = cipher.update(string, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
}
let encryption = encrypt(string)
console.log("Encrypted: ", encryption);

/**
 * writes encrypted text to a file
 */
(() => {
    try{
        fs.writeFileSync(path,encryption);
        console.log("Successfuly encrypted file")
    }catch (error){
        console.log(error);
    }

})()
const decipher = crypto.createDecipheriv(algorithm, key, null);
let string2 = readFile(path)

/**
 *
 * @param string takes a path to a file
 * @return {string} returns decrypted text
 */
decrypt = (string) => {
    let decrypted = decipher.update(string, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

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
let decrypted = decrypt(string2)
// writeDecryptedStringToAFile(path2,decrypted)

console.log("Decrypted: ", decrypted);
