var __DEV__ = true

function Vue(options) {
  return this._init(options)
}

Vue.prototype._init = function (options) {
  var vm = this

  vm.$options = options

  callHook(vm, 'beforeCreate')

  initState(vm)

  callHook(vm, 'created')

  this.$mount()
}

Vue.prototype.$mount = function () {
  var vm = this
  // 开始渲染
  new Watcher(vm, updateComponent, noop, {}, true)
}

// render
function updateComponent() {}

// tools
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    writable: true,
    configurable: true,
    enumerable: !!enumerable,
  })
}

function noop() {}

function error(msg) {
  __DEV__ && console.error(msg)
}

function isPlainObject(value) {
  return typeof value === 'object' && value != null
}

function callHook(vm, hook) {
  if (hook in vm.$options) {
    vm.$options[hook].call(vm)
  }
}

export default Vue

var data = {
  a: {
    c: 1,
    b: 2,
  },
}
