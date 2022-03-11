import { createI18n } from 'vue-i18n'
import zh from './zh-CN'
import en from './en-US'

const messages = {
  'zh-CN': zh,
  'en-US': en,
}

const i18n = createI18n({
  locale: 'zh-CN',
  messages,
})

export default i18n
