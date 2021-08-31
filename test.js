function deepCopy(obj, map) {
  // 基本数据类型 | 函数，直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }

  if (!map) {
    map = new WeakMap()
  }

  if (map.has(obj)) {
    return obj
  }

  let dest = Array.isArray(obj) ? [] : {}
  let keys = Reflect.ownKeys(obj)
  for (let key of keys) {
    map.set(obj[key])
    dest[key] = deepCopy(obj[key], map)
  }
  return dest
}

var o = {
  name: 'stone',
  age: 18,
  other: {
    job: 'teacher',
  },
  enjoy: [
    {
      name: 'run',
    },
    {
      name: 'walk',
    },
  ],
  a: null,
  c: undefined,
  [Symbol(0)]: '0',
}

var d = deepCopy(o)
