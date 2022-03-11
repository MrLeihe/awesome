import Vue from 'vue'
import { createI18n } from 'vue-i18n'

const messages = {
  zh: require('./zh.json.js.js'),
  en: require('./en.json.js.js'),
}

const i18n = createI18n({})

export default i18n
