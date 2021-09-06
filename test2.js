var ncName = `[a-zA-Z_][\\w-\\.]*`
var qcNameCapture = `((?:${ncName}\\:)?${ncName})`
var startTagOpen = new RegExp(`<${qcNameCapture}`)
var startTagClose = /^\s*>/
var attrReg = new RegExp(`\\s+${qcNameCapture}="(.*(?="))`)

var html = `<div id="1">stone</div>`
var cursor = 0

// start
var start = html.match(startTagOpen)

var match = {
  tagNmae: start[1],
  attrs: [],
  start: 0,
  end: 0,
}
html = html.slice(start[0].length)
cursor += start[0].length

var end, attr
while (!(end = html.match(startTagClose)) && (attr = html.match(attrReg))) {
  html = html.slice(attr[0].length)
  match.attrs.push({ [attr[1]]: attr[2] })
  cursor += attr[0].length
}

console.log(match)
