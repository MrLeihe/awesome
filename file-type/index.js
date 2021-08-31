const FileType = require('file-type')
const fs = require('fs')

;(async () => {
  const stream = fs.createReadStream('./test.pdf')

  console.log(await FileType.fromStream(stream))
  //=> {ext: 'mp4', mime: 'video/mp4'}
})()
