<template>
  <Child ref="child" class="child" style="color: red" @increment="onChange" name="stone" :age="age" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Child from './components/Child.vue'
import { ref, provide } from 'vue'
import { searchUrlParams, joinUrl } from '@yxcx/util'

const url =
  'http://dev-m-kaop.sdyxmall.com/op/jfl-v2-test1/showcase?fid=1026?cb=http%3A%2F%2Fdev-m-kaop.sdyxmall.com%2Fop%2Fjfl-v2-test1%2Fshowcase%3Ffid%3D1026&loginToken=12233333jklskjsl&firstLogin=1'

const navigateTo = (url, opts) => {
  const { persisted = true, replace = false } = opts || {}

  if (!persisted) {
    const prefix = location.origin + location.pathname
    const params = searchUrlParams(location.href)
    // 添加时间戳
    const curUrl = joinUrl(prefix, { ...params, x_time: Date.now() })
    console.log('curUrl====', curUrl)
    // 修改记录
    history.replaceState({}, '', curUrl)
  }

  if (replace) {
    return location.replace(url)
  }

  location.href = url
}

navigateTo(url, { persisted: false })

const count = ref(0)
const age = ref(18)

provide('count', count)

const onChange = () => {
  count.value++
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
