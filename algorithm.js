var obj = { a: 1, b: [1, 2, 3] }

var vm = {}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    get: function rectiveGetter() {
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('set', newVal)
      val = newVal
    },
    enumerable: enumerable || false,
    configurable: true,
  })
}

function reactive(obj) {
  Object.keys(obj).forEach(function (key) {
    def(obj, key, obj[key])
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      reactive(obj[key])
    }
  })
}

reactive(obj)
