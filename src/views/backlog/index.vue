<template>
  <div>
    <div style="text-align: center">
      <p ref="p">
        可选择区域: 123111111111111aaaaaaaaaaabbbbbbbbbbb eeeeeeeeeeeeeeee
      </p>
      <p>已选择的值：{{ text }}</p>
      <p>位置信息：rect: {{ rect }}</p>
      <p>left: {{ rect.left }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useTextSelection from '@/hooks/useTextSelection'

const { text, rect } = useTextSelection()
</script>
