// 用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等

// function fibonacci(n) {
//   if (n <= 2) {
//     return 1
//   }
//   return fibonacci(n - 1) + fibonacci(n - 2)
// }

console.log(fibonacci(7))
console.log(fibonacci(1))
console.log(fibonacci(2))

function fibonacci(n) {
  var pre = 1
  var cur = 1
  for (var i = 3; i <= n; i++) {
    ;[pre, cur] = [cur, pre + cur]
  }
  return cur
}
