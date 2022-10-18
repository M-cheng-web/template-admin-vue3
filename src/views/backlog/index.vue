<template>
  <div class="hello">
    <div>webScoket状态： {{ readyState }}</div>
    <button @click="connect">连接webScoket</button>
    <button @click="disconnect">关闭webScoket</button>
    <button @click="handleSendMessage">发送消息</button>
  </div>
</template>

<script setup lang="ts">
import useWebSocket from '@/hooks/useWebSocket'

const { readyState, latestMessage, connect, disconnect, sendMessage } =
  useWebSocket('ws://82.157.123.54:9010/ajaxchattest')

const handleSendMessage = () => {
  sendMessage('hello v3hooks')
}

watchEffect(() => {
  console.log(latestMessage.value)
})
</script>
