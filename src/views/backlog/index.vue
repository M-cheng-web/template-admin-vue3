<template>
  <div class="hello">
    123
    <div ref="ddd" class="ddd">
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSleep from '@/hooks/useSleep'

onMounted(async () => {
  console.log(1)
  await useSleep(3000, 'await')
  console.log(2)
})
</script>

<style lang="scss" scoped>
.hello {
  border: 1px solid red;
  height: 120vh;
  .ddd {
    border: 1px solid red;
    height: 300px;
    overflow-y: auto;
    & > div {
      height: 600px;
    }
  }
}
</style>
