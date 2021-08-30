<template>
  <div class="h-screen flex justify-center">
    <div class="flex flex-col justify-center">
      <User />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Connect from './Connect.vue'
import User from './User.vue'

export default defineComponent({
  components: {
    Connect,
    User,
  },
})
</script>

<style>
html {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC',
    'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC',
    'Source Han Sans CN', 'Microsoft YaHei', 'Wenquanyi Micro Hei',
    'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji' !important;
}
</style>
