<template>
  <div class="text-center text-8xl">
    {{ updated ? (connected ? '✅' : '❌') : '⏳' }}
  </div>
  <div class="text-center text-4xl font-bold m-2">
    {{ updated ? (connected ? '已经连上网啦' : '没连上网哦') : '请稍等' }}
  </div>
  <div v-if="updated">
    <ul v-if="ap">
      <li>🌐 网络 {{ APInfo[ap].name }}</li>
      <template v-if="user">
        <li>🏠 IP {{ user.online_ip }}</li>
        <li v-if="user.user_name">
          👤 用户 {{ user.user_name }}
          <template v-if="ap === 'ncuxg'"> ({{ ISP[user.domain] }}) </template>
        </li>
        <li v-if="user.add_time">
          🕒 时间 {{ new Date(user.add_time * 1000).toLocaleString() }}
        </li>
      </template>
    </ul>
  </div>
  <button @click="updateConnectionStatus">更新连接状态</button>
  <button v-if="connected" @click="disconnect">断开</button>
  <template v-else>
    <form>
      <ul>
        <li>
          <label>用户名 <input /></label>
        </li>
        <li>
          <label>密码 <input /></label>
        </li>
        <li v-if="ap === 'ncuxg'">
          <label>
            接入点
            <select>
              <option v-for="(name, isp) in ISP" :key="isp">
                {{ name }}
              </option>
            </select>
          </label>
        </li>
      </ul>
    </form>
    <button @click="connect">连接</button>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updated, connected, ap, user, updateConnectionStatus } from './status'
import { APInfo, ISP } from './constants'
import { connect, disconnect } from './connect'

export default defineComponent({
  setup() {
    updateConnectionStatus()

    return {
      updated,
      connected,
      ap,
      user,
      updateConnectionStatus,
      APInfo,
      ISP,
      connect,
      disconnect,
    }
  },
})
</script>
