const babelTypes = require('@babel/types')

// 1、type 从 ArrowFunctionExpression 变成 FunctionExpression
// 2、this 的处理
// 3、定义 const _this = this
function arrowFunctionsPlugin(babel) {
  return {
    visitor: {
      ArrowFunctionExpression(path) {
        // 找到外层非箭头函数的 this
        const parent = path.findParent((p) => {
          return (p.isFunction() && p.isArrowFunctionExpression()) || p.isProgram()
        })

        const thisPaths = getScopedThisPaths(parent)

        const thisBindingsName = '_this'

        // const _this = this
        parent.scope.push({
          id: babelTypes.identifier(thisBindingsName),
          init: babelTypes.thisExpression(),
        })

        // 替换 this
        thisPaths.forEach((thisPath) => {
          const replaceNode = babelTypes.identifier(thisBindingsName)
          thisPath.replaceWith(replaceNode)
        })

        path.node.type = 'FunctionExpression'
      },
    },
  }
}

function getScopedThisPaths(path) {
  const thisPaths = []
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath)
    },
  })
  return thisPaths
}

module.exports = arrowFunctionsPlugin
