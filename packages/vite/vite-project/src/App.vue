<template>
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div>count: {{countRef}}</div>
  <button @click="increment">增加</button>
  <input type="file" @change="handleFile" />
</template>

<script>
import { ref, reactive, isReactive, toRefs, toRef, defineComponent, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  components: {
    HelloWorld,
  },
  setup(props) {
    const count = ref(1)

    const reactValue = reactive({ count })

    console.log('reactValue==', reactValue)

    const copy = toRefs(reactValue)

    const { count: countRef } = copy

    console.log('countRef==', countRef)

    const increment = () => {
      count.value++
    }

    onMounted(() => {
      console.log('onMounted====')
    })

    const foo = (a, b) => {
      console.log(Array.prototype.slice.call(arguments))
    }

    const goo = function(a, b) {}

    foo(1, 2)

    console.log('foo====', foo)
    console.dir(foo)
    console.dir(goo)

    return {
      countRef,
      increment,
    }
  },
  methods: {
    handleFile(event) {
      console.log('handleFile==', event.target.files)
      const file = event.target.files[0]
      console.log(file.slice(0, 1024))
    },
  },
})
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
