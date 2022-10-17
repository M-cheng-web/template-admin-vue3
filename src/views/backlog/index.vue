<template>
  <div class="hello">
    <button
      style="margin-top: 30px"
      type="button"
      @click="handleVirtualScrollTo"
    >
      scroll to
    </button>

    <div
      :ref="containerProps.ref"
      @scroll="containerProps.onScroll"
      style="height: 300px; overflow: auto; border: 1px solid #cccccc"
    >
      <div :style="wrapperStyle">
        <div
          v-for="active in list"
          :key="active"
          style="
            height: 59px;
            border-bottom: 1px solid #cccccc;
            background-color: white;
          "
        >
          {{ active }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVirtualList from '@/hooks/useVirtualList'

const { list, wrapperStyle, containerProps, scrollTo } = useVirtualList(
  Array.from(Array(99999).keys()),
  {
    itemHeight: 60,
    overscan: 10
  }
)

const handleVirtualScrollTo = () => {
  scrollTo(22)
}
</script>
