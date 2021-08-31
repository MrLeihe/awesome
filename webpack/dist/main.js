(function(graph){
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
      require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./hello":"src/hello"},"code":"\"use strict\";\n\nvar _hello = _interopRequireDefault(require(\"./hello\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n_hello[\"default\"].sayHello();"},"src/hello":{"dependencies":{"./hello":"src/hello"},"code":"\"use strict\";\n\nvar _hello = _interopRequireDefault(require(\"./hello\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n_hello[\"default\"].sayHello();"}})