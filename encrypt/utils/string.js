function getStrBytes(str) {
  return str.replace(/[^\u0000-\u00ff]/g, 'aa').length
}

function getStrBytes2(str) {
  var bytesCount
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i)
    if (/^[\u0000-\u00ff]$/.test(c)) {
      //匹配双字节
      bytesCount += 1
    } else {
      bytesCount += 2
    }
  }
  return bytesCount
}
