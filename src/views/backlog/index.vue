<template>
  <div class="backlog">
    <div>
      <input
        v-model="debounceCurrValue"
        placeholder="Typed value"
        style="width: 280"
      />
      <p style="margintop: 16">DebouncedValue: {{ debounceValue }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDebounce from '@/hooks/useDebounce'

const debounceCurrValue = ref(1)
const debounceValue = useDebounce(debounceCurrValue, 500)
</script>

<style scoped lang="scss">
.backlog {
  padding: 24px 18px;
}
</style>
