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
