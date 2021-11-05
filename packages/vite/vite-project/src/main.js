import { createApp } from 'vue'
import App from './App.vue'
import _ from 'lodash'

createApp(App).mount('#app')

import { isPhoneNumber, decode } from '@yxcx/util'

console.log('isPhoneNumber===', isPhoneNumber('18617169508'))

console.log(decode('%'))
