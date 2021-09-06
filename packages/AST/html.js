const recast = require('recast')

var html = `<div id="1">stone</div>`

var ast = recast.parse(html)

console.log(ast)
