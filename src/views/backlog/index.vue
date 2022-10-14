<template>
  <div>
    <div style="width: 60vw">
      <p>value:{{ state }}</p>
    </div>
    <div style="width: 39vw">
      <button @click="handleUpdate">更新storage</button>
      <button @click="handleDelete">删除storage</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLocalStorage from '@/hooks/useLocalStorage'

const state = useLocalStorage('useLocalStorage', { a: 231 })

const handleUpdate = () => {
  state.value = { a: Math.random() }
}

const handleDelete = () => {
  state.value = undefined
}
</script>

<style scoped lang="scss">
.full {
  border: 1px solid red;
  height: 400px;
  background-color: aliceblue;
}
.backlog {
  padding: 24px 18px;
}
</style>
