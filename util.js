/**
 * 校验是否是合法的手机号码
 *
 * @returns {boolean}
 * @param {string} phoneNumber 需要检测的字符串
 * @example
 *
 * isPhone('18617678909')
 * // => true
 */
const isPhone = (phoneNumber, loose) => {
  return loose ? /^1\d{10}$/.test(phoneNumber) : /^1[3-9]{9}$/.test(phoneNumber)
}
