const Crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const sign = Crypto.createSign('RSA-SHA256')
const verify = Crypto.createVerify('RSA-SHA256')

const publicKey = fs
  .readFileSync(path.join(__dirname, './pem/pub_key.pem'))
  .toString()
const privateKey = fs
  .readFileSync(path.resolve(__dirname, './pem/pri_key.pem'))
  .toString()

// 利用公钥对数据加密
const cipher = Crypto.publicEncrypt(publicKey, Buffer.from('stone', 'utf8'))
console.log('cipher: ', cipher)

// 利用私钥解密
const originSource = Crypto.privateDecrypt(privateKey, cipher)
console.log('originSource: ', originSource.toString('utf8'))
