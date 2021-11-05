const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
const isToday = require('dayjs/plugin/isToday')

dayjs.extend(duration)
dayjs.extend(isToday)

console.log(dayjs.duration(5184000000).weeks())
console.log(dayjs.duration(1500).minutes())
