<template>
  <div v-bind="$attrs">数量：{{ count }}</div>
  <button
    @click="
      () => {
        onIncrement()
        log($attrs)
      }
    "
  >
    increment
  </button>
</template>
<script setup>
import { inject, useAttrs } from 'vue'

const log = console.log

defineProps({
  name: String,
})

const count = inject('count')

const onIncrement = () => {}

const attrs = useAttrs()
console.log('attrs', attrs)

defineExpose({
  count,
  onIncrement,
})
</script>
<style lang="less"></style>
