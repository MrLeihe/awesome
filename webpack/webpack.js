const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const options = require('./webpack.config')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const Parser = {
  getAst: (path) => {
    // 读取入口文件
    const content = fs.readFileSync(path, 'utf-8')
    console.log('content:', content)
    // 将文件内容转化为 AST 抽血语法树
    return parser.parse(content, {
      sourceType: 'module',
    })
  },
  getDependencies: (ast, filename) => {
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        console.log('node:', node)
        // 保存依赖模块路径，生成依赖关系图
        const dirname = path.dirname(filename)
        const filepath = path.join('./', dirname, node.source.value)
        dependencies[node.source.value] = filepath
      },
    })
    return dependencies
  },
  getCode: (ast) => {
    // ast 转为 code
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    return code
  },
}

class Compiler {
  constructor(options) {
    // 读取 webpack 配置
    const { entry, output } = options
    // 入口
    this.entry = entry
    // 出口
    this.output = output
    // 模块
    this.modules = []
  }

  run() {
    const info = this.build(this.entry)
    this.modules.push(info)
    this.modules.forEach(({ dependencies }) => {
      console.log('dependencies---', dependencies)
      // 如果有依赖项，递归解析
      if (dependencies) {
        Object.keys(dependencies).forEach((key) => {
          this.modules.push(this.build(dependencies[key]))
        })
      }
    })
    // 生成依赖关系图
    const dependencyGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        [item.filename]: {
          dependencies: item.dependencies,
          code: item.code,
        },
      }),
      {}
    )

    this.generator(dependencyGraph)
  }

  build(filename) {
    const { getAst, getDependencies, getCode } = Parser
    // 获取 ast
    const ast = getAst(this.entry)
    const dependencies = getDependencies(ast, this.entry)
    console.log('dependencies:', dependencies)
    const code = getCode(ast)
    console.log('code:', code)
    return {
      filename,
      dependencies,
      code,
    }
  }

  // 重写 require 函数，因为浏览器不能识别 commonjs 语法，输出 bundle
  generator(code) {
    const filepath = path.join(this.output.path, this.output.filename)
    const bundle = `(function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[module].code);
        return exports;
      }
      require('${this.entry}')
    })(${JSON.stringify(code)})`

    let isDir = fs.existsSync(this.output.path)
    console.log('dir----', isDir)
    if (!isDir) {
      fs.mkdirSync(this.output.path)
    }
    fs.writeFileSync(filepath, bundle, 'utf-8')
  }
}

// 启动编译
new Compiler(options).run()
