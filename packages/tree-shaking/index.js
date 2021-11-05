import { compose } from '@yxcx/util'

const add = (a, b) => a + b

const minus = (x) => x - 9

console.log(compose(minus, add)(4, 5))
