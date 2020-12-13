const SHA256 = require('crypto-js/sha256')

const cipher = SHA256('stone')
console.log('cipher: ' + cipher)
