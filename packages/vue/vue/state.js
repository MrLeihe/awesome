/**
 * 初始化状态
 */
function initState(vm) {
  var opts = vm.$options
  if (opts.props) {
    initProps(vm, opts.props)
  }
  if (opts.methods) {
    initMethods(vm, opts.methods)
  }
  if (opts.data) {
    initData(vm, opts.data)
  }
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch) {
    initWatch(vm, opts.watch)
  }
}

var sharedDefineProperts = {
  enumerable: true,
  configurable: true,
}

/**
 * 代理属性到 Vue 实例上
 */
function proxy(target, sourceKey, key) {
  sharedDefineProperts.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedDefineProperts.set = function proxySetter(val) {
    return (this[sourceKey][key] = val)
  }
  Object.defineProperty(target, key, sharedDefineProperts)
}

function initProps(vm, props) {
  let _props = (vm._props = {})

  for (let key in props) {
    // reactive
    defineReactive(_props, key, props[key])

    // proxy data on instance
    proxy(vm, '_props', key)
  }
}

function initData(vm, data) {
  var _data = vm._data
  data = typeof data === 'function' ? data.call(vm) : data

  // reactive
  observe(_data)

  // proxy data on instance
  for (let key in _data) {
    proxy(vm, '_data', key)
  }
}

function initMethods(vm, methods) {
  // 省略对 key 的合法性判断
  for (let key in methods) {
    vm[key] = typeof methods[key] === 'function' ? methods[key].bind(vm) : noop
  }
}

function initComputed(vm, computed) {}

function initWatch(vm, watch) {}
