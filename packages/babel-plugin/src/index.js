const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const customArrowFunctions = require('../plugin/plugin-transform-arrow-functions')
const arrowFunctions = require('@babel/plugin-transform-arrow-functions')
const spread = require('@babel/plugin-transform-spread')
const parameters = require('@babel/plugin-transform-parameters')

// parse

const code = `
const add = (a, b) => {
  console.log(this.name)
  return a + b
}`
const ast = babel.parse(code)

babel.transform(
  code,
  {
    plugins: [customArrowFunctions],
    ast: true,
  },
  (err, res) => {
    console.log('code：', res.code)
  },
)

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: 'a' })) {
      path.node.name = 'x'
    }
  },
})

// 写入 ast 到文件
// const fs = require('fs')

// fs.writeFile('./ast.json', JSON.stringify(ast, null, '\t'), (err) => {
//   if (err) {
//     console.err(err)
//   }
// })

// const output = generate(ast, {})
