const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
  this.state = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  let resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }

    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach((cb) => cb())
    }
  }

  let reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((cb) => cb())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError(`Chaining cycle detected for promise #<Promise>`)
  }

  let called = false
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
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
    onRejected = (reason) => {
      throw reason
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

  return promise2
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = function (callback) {
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
  if (value instanceof Promise) {
    return value
  }
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.all = function (promises) {
  if (!Array.isArray(promises)) {
    let type = typeof promises
    throw new TypeError(`${type} ${promises} is not iterator`)
  }

  return new Promise((resolve, reject) => {
    let orderIndex = 0
    let res = []

    let promiseResultByKey = (index, result) => {
      res[index] = result
      if (++orderIndex === promises.length) {
        resolve(res)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      let item = promises[i]
      if (item && typeof item.then === 'function') {
        item.then(
          (value) => {
            promiseResultByKey(i, value)
          },
          (reason) => {
            reject(reason)
          }
        )
      } else {
        promiseResultByKey(i, item)
      }
    }
  })
}

Promise.race = function (promises) {
  if (!Array.isArray(promises)) {
    let type = typeof promises
    throw new TypeError(`${type} ${promises} is not iterable`)
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject)
    }
  })
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
