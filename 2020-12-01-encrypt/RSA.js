const Crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { Base64 } = require('js-base64')

const publicKey = fs
  .readFileSync(path.join(__dirname, './pem/pub_key.pem'))
  .toString()
const privateKey = fs
  .readFileSync(path.resolve(__dirname, './pem/pri_key.pem'))
  .toString()

/**
 * RSA 最大加密明文大小
 */
const MAX_ENCRYPT_BLOCK = 117

/**
 * RSA 最大解密密文大小
 */
const MAX_DECRYPT_BLOCK = 128

const userInfo = {
  uid: '66668888',
  name: 'stone',
  nickName: '石头',
  gender: 1,
  mobile: '18617169508',
}

const str = JSON.stringify(userInfo)

// 利用公钥对数据加密
function publicEncrypt(buffer) {
  return Crypto.publicEncrypt(
    {
      key: publicKey,
      padding: Crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  )
}

function encrypt(str) {
  // 加密信息用 buffer 封装
  var buffer = Buffer.from(str, 'utf8')
  // buffer 转 byte 数组
  const inputLen = buffer.byteLength
  // 密文
  let bufs = []
  // 偏移量
  let offset = 0

  console.log('inputLen:', inputLen)

  // 分段加密
  if (inputLen > MAX_ENCRYPT_BLOCK) {
    while (inputLen > offset) {
      console.log('offset:', offset)
      if (inputLen - offset > MAX_ENCRYPT_BLOCK) {
        let bufTmp = buffer.slice(offset, offset + MAX_ENCRYPT_BLOCK)
        bufs.push(publicEncrypt(bufTmp))
      } else {
        let bufTmp = buffer.slice(offset, inputLen)
        bufs.push(publicEncrypt(bufTmp))
      }

      console.log('bufs:', bufs)

      offset += MAX_ENCRYPT_BLOCK
    }
    return Buffer.concat(bufs)
  }

  return publicEncrypt(buffer)
}

// const cipher = Base64.encode(encrypt(str))
const cipher = encrypt(str).toString('base64')

console.log('cipher: ', cipher)

function privateDecrypt(buffer) {
  return Crypto.privateDecrypt(
    {
      key: privateKey,
      padding: Crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  )
}

// var depStr =
//   '4FNo4usNerdlOrxly1QGztFiCWdKhInmU5-sbwY2TqTgqC0qOZHeLZ-Ixzzj1E30QNcw_NXJV2XHRCZba5EeTSTrCjAblc5Fn38qMNCjE6G4UHqi6VUTXI3CTG2_-lvdzGa9L-xwCURNKgXZVoDHhSQH9xIaX9N-s13wRu2sbHo='

// 利用私钥解密
function decrypt(cipher) {
  // const buffer = new Buffer(cipher, 'base64')
  const buffer = new Buffer(Base64.decode(cipher))
  // buffer 转 byte 数组
  const inputLen = buffer.byteLength
  console.log('inputLen---', inputLen)
  // 密文
  let bufs = []
  // 偏移量
  let offset = 0

  if (inputLen > MAX_DECRYPT_BLOCK) {
    while (inputLen > offset) {
      console.log('offset:', offset)
      if (inputLen - offset > MAX_DECRYPT_BLOCK) {
        let bufTmp = buffer.slice(offset, offset + MAX_DECRYPT_BLOCK)
        bufs.push(privateDecrypt(bufTmp))
      } else {
        let bufTmp = buffer.slice(offset, inputLen)
        bufs.push(privateDecrypt(bufTmp))
      }

      console.log('bufs:', bufs)

      offset += MAX_DECRYPT_BLOCK
    }
    return Buffer.concat(bufs)
  }

  return privateDecrypt(buffer)
}

const originSource = decrypt(cipher)
console.log('originSource: ', originSource.toString())
