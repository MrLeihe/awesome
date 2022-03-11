<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { useI18n } from 'vue-i18n'

const { locale, fallbackLocale } = useI18n()
console.log('locale===', locale)
console.log('fallbackLocale===', fallbackLocale)

const switchZH = () => {
  locale.value = 'zh-CN'
}

const switchEN = () => {
  locale.value = 'en-US'
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div>{{ $t('message.hello') }}</div>
  <button @click="switchZH">zh-CN</button>
  <button @click="switchEN">en-US</button>
  <div class="share-btn">
    <div class="share-popup">
      <ul>
        <li>微信</li>
        <li>微博</li>
        <li>QQ</li>
      </ul>
    </div>
  </div>
</template>

<style>
body {
  background: #ddd;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.triangle {
  border: 6px solid transparent;
  border-right-color: #000;
}

.share-btn {
  position: relative;
  background-image: url('https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/8149dfdd9eb79cf33c7227a3bf63f47c.svg');
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  background-position: 50%;
  background-repeat: no-repeat;
  box-shadow: 0 1px 2px 1px #ddd;
}

.share-btn:hover > .share-popup {
  display: block;
}

.share-btn::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  left: 20px;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.share-popup {
  display: none;
  position: absolute;
  left: calc(100% + 14px);
  width: max-content;
  padding: 10px;
  box-shadow: 0 1px 2px 1px #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.share-popup::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  right: 100%;
  top: 20px;
  border: 6px solid transparent;
  border-right-color: #fff;
}
</style>
