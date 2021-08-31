const recast = require('recast')

const code = `
    function add(a, b) {
        return a + 
        b
    }
`

const ast = recast.parse(code)
const add = ast.program.body[0]

// 改变 add 函数
const {
  variableDeclaration,
  variableDeclarator,
  functionExpression,
} = recast.types.builders

ast.program.body[0] = variableDeclaration('const', [
  variableDeclarator(add.id, functionExpression(null, add.params, add.body)),
])

const newCode = recast.prettyPrint(ast, { tabWidth: 2 }).code

console.log(newCode)
