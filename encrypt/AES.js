const CryptoJs = require('crypto-js')
const randomBytes = require('randombytes')

console.log('randomBytes:', randomBytes(16))

const cipherText = CryptoJs.AES.encrypt('stone', '123456').toString()
console.log('cipherText:', cipherText)

const bytes = CryptoJs.AES.decrypt(cipherText, '123456')
console.log('bytes:', bytes)

const originText = bytes.toString(CryptoJs.enc.Utf8)
console.log('originText:', originText)
