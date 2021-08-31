#!/usr/bin/env node

const recast = require('recast')
const TNT = recast.types.namedTypes

const {
  identifier: id,
  expressionStatement,
  memberExpression,
  assignmentExpression,
  arrowFunctionExpression,
  blockStatement,
} = recast.types.builders

recast.run(function (ast, printSource) {
  // 一个块级域 {}
  console.log('\n\nstep1:')
  printSource(blockStatement([]))

  // 一个键头函数 ()=>{}
  console.log('\n\nstep2:')
  printSource(arrowFunctionExpression([], blockStatement([])))

  // add赋值为键头函数  add = ()=>{}
  console.log('\n\nstep3:')
  printSource(
    assignmentExpression(
      '=',
      id('add'),
      arrowFunctionExpression([], blockStatement([]))
    )
  )

  // exports.add赋值为键头函数  exports.add = ()=>{}
  console.log('\n\nstep4:')
  printSource(
    expressionStatement(
      assignmentExpression(
        '=',
        memberExpression(id('exports'), id('add')),
        arrowFunctionExpression([], blockStatement([]))
      )
    )
  )
})

// recast.run(function (ast, printSource) {
//   recast.visit(ast, {
//     visitExpressionStatement: function (path) {
//       const node = path.node
//       printSource(node)
//       if (TNT.ExpressionStatement.check(node)) {
//         console.log('这是一个 ExpressionStatement')
//       }
//       TNT.ExpressionStatement.assert(node)
//       this.traverse(path)
//     },
//   })
// })
