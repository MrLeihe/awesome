// const mod = require('./base').default

// console.log(mod)

// 动态加载模块
;(function (source) {
  function require(file) {
    var exports = {}
    ;(function (exports, code) {
      eval(code)
    })(exports, source[file])
    return exports
  }
  require('index.js')
})({
  'add.js': 'exports.default = function add(a, b){ return a + b }',
  'index.js': `
    var add = require('add.js').default
    console.log(add(1, 2))
  `,
})
