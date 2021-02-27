// 三个状态
let PENDING = 'pending'
let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'

// 构造函数
function Promise(executor) {
  // 默认状态为 PENDING
  this.state = PENDING
  // resolve 的值 value，可以是任何 JavaScript 对象
  this.value = undefined
  // reject 的错误信息
  this.reason = undefined
  // resolve 回调
  this.onFulfilledCallbacks = []
  // reject 回调
  this.onRejectedCallbacks = []

  let resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    // 状态为 PENDING 时才可以更新状态，防止 resolve 在 executor 中被多次调用
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach((cb) => {
        cb(value)
      })
    }
  }

  let reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((cb) => {
        cb(reason)
      })
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// 链式调用
var resolvePromise = function (promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }

  // 2.3.3.3.3. resolve 和 reject 如果多次被执行，则以第一次为准，其余调用将被忽略。
  let called = false
  // if x is an object or function,
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      // 2.3.3.1. Let then be x.then
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) {
              return
            }
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) {
              return
            }
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      // 2.3.3.2. If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function') {
    onFulfilled = (value) => value
  }
  if (typeof onRejected !== 'function') {
    onRejected = (e) => {
      throw e
    }
  }

  let promise2 = new Promise((resolve, reject) => {
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })

      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }

    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }

    if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    }
  })

  // 返回一个新的 promise
  return promise2
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = function (callback) {
  // 由于无法知道promise的最终状态，所以finally的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况。
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => value)
    },
    (reason) => {
      return Promise.resolve(callback()).then(() => {
        throw reason
      })
    }
  )
}

Promise.resolve = function (value) {
  // 默认产生一个成功的 promise
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.reject = function (reason) {
  // 默认产生一个失败的 promise
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.all = function (promises) {
  if (!Array.isArray(promises)) {
    const type = typeof promises
    throw new TypeError(`${type} ${promises} is not iterable`)
  }

  return new Promise((resolve, reject) => {
    const results = []
    let orderIndex = 0

    const processResultByKey = function (result, index) {
      results[index] = result
      if (++orderIndex === promises.length) {
        resolve(results)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      let item = promises[i]
      if (item && typeof item.then === 'function') {
        item.then(
          (value) => {
            processResultByKey(value, i)
          },
          (reason) => {
            reject(reason)
          }
        )
      } else {
        processResultByKey(item, i)
      }
    }
  })
}

Promise.race = function (promises) {
  if (!Array.isArray(promises)) {
    const type = typeof promises
    throw new TypeError(`${type} ${promises} is not iterable`)
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject)
    }
  })
}

// support test unit
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(new Promise((resolve, reject) => resolve('stone')))
//   }, 0)
// }).then((res) => {
//   console.log('then:', res)
//   return 'pony'
// })

Promise.resolve(
  new Promise((resolve, reject) => {
    resolve('test')
  })
    .then((value) => value)
    .then((value) => {
      console.log('second:', value)
      return 'fuck'
    })
).then((res) => {
  console.log('resolve:', res)
})

// Promise.reject('nuoyi').catch((e) => {})

// Promise.all([Promise.resolve('pony'), Promise.reject('nuoyi')])
//   .then((res) => {})
//   .catch((e) => {})

Promise.race([Promise.resolve('pony'), 1])
  .then((res) => {
    console.log('race:', res)
  })
  .catch((e) => {
    console.log('race-e:', e)
  })

Promise.race([
  1,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('haha')
    }, 0)
  }),
])
  .then((res) => {
    console.log('race:', res)
  })
  .catch((e) => {
    console.log('race-e:', e)
  })

module.exports = Promise
