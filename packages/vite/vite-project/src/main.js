import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// history.pushState(null, null, document.URL)
window.addEventListener('popstate', function () {
  console.log('popstate====')
  history.pushState(null, null, document.URL)
})
