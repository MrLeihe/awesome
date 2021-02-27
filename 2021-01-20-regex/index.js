/**
 * 电话号码简单判断
 */
function isPhone(phoneNumber) {
  return /^1\d{10}$/.test(phoneNumber)
}

/**
 * 电话号码更精确的匹配
 */
function isPhoneExactMatch(phoneNumber) {
  return /^1[3-9]\d{9}$/.test(phoneNumber)
}
// isPhone('18167879870') true

/**
 * 判断 6-8 位密码，只能是数字或大小写字母
 */
function checkPassword(password) {
  return /^[0-9a-zA-Z]{6,8}$/.test(password)
}
// checkPassword('stone666') true

/**
 * 校验身份证
 * 规则：15位纯数字，18位纯数字或者17位纯数字+X
 */
function checkIDCard(idCard) {
  return /^(\d{15}|\d{18}|\d{17}X)$/.test(idCard)
}

/**
 * 匹配连续重复3次及以上出现的数字
 */
function matchRepeat(str) {
  return str.match(/(\d)\1{2,}/g)
}
// matchRepeat(123336778889) ==> ["333", "77", "888"]

/**
 * 匹配中文
 */
function matchChinese(str) {
  return /^[\u4e00-\u9fa5]+$/.test(str)
}
// matchChinese('哈哈') true

/**
 * . 在正则中表示匹配任意字符
 * * 表示匹配任意次，包括 0 次
 */
function matchAny(str) {
  return /^.*$/.test(str)
}
// matchAny('') true

/**
 * + 表示最少匹配一次
 */
function matchLessOne(str) {
  return /^.+$/.test(str)
}
// matchLessOne('') false

/**
 * ？表示匹配 0 或 1 次
 */
function matchNoneOrOne(str) {
  return /^.?$/.test(str)
}
// matchNoneOrOne('') true
// matchNoneOrOne('1') true
// matchNoneOrOne('11') false

/**
 * 不允许出现某个字符
 */
function notAllowSomeChar(str) {
  return
}
