const Base64 = require('js-base64')

const data = `Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.`

console.log(Base64.encode('https://github.com/programthink/zhao'))

console.log(Base64.decode(Base64.encode(data)))

console.log(Base64.decode('aHR0cHM6Ly9wcm9ncmFtLXRoaW5rLmJsb2dzcG90LmNvbS8yMDE5LzAxL1NlY3VyaXR5LUd1aWRlLWZvci1Qb2xpdGljYWwtQWN0aXZpc3RzLmh0bWw='))
