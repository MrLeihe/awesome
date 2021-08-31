class Observer {
  constructor(value) {
    this.value = value

    // 标识为已经是响应式属性
    def(value, '__ob__', this)

    // 一开始对这里的 dep 的作用非常迷惑，后面才看懂，这里的 dep 会在 $set 和 $del，以及覆盖 Array 的7个方法中会用到，ob.dep.notify()
    // 依赖收集的时候，会通过 childOb 收集依赖
    this.dep = new Dep()

    // 数组和对象分别处理
    if (Array.isArray(value)) {
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    var keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      defineReactive(obj, key, obj[key])
    }
  }

  observeArray(array) {
    for (let i = 0, l = array.length; i < l; i++) {
      observe(array[i])
    }
  }
}

function observe(value) {
  // 如果是对象则继续添加为响应式
  if (!isPlainObject(value)) {
    return
  }

  var ob
  if (value.hasOwnProperty('__ob__')) {
    // 已经 observer 了
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

function defineReactive(target, key, val) {
  var descriptor = Object.getOwnPropertyDescriptor(target, key)
  if (!descriptor.configurable) {
    return
  }

  // 闭包中定义一个 dep 对象
  var dep = new Dep()

  // 为深层对象添加响应式
  var childOb = observe(val)

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('触发了 getter', key, val)
      // 收集依赖
      if (Dep.target) {
        dep.depend()
        // 用于之后对 ob.dep.notify 的调用
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('触发了 setter', key, newVal)
      if (val === newVal || (val !== val && newVal !== newVal)) {
        return
      }
      val = newVal

      observe(newVal)
      // 通知变更
      dep.notify()
    },
  })
}
