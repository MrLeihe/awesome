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

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

Vue.prototype.$mount = function (el) {
  var vm = this

  vm.$el = document.querySelector(el)

  // 开始渲染
  new Watcher(vm, updateComponent, noop, {}, true)
}
