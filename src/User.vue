<template>
  <div class="text-center text-8xl">👥</div>
  <div class="text-center text-4xl font-bold m-2">管理账号</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as fs from 'tauri/api/fs'
import { promisified } from 'tauri/api/tauri'

export default defineComponent({
  setup() {
    ;(async () => {
      const dir = await promisified({ cmd: 'configDir' })
      try {
      console.log(await fs.readDir(dir))} catch{
        console.log('no dir');
        await fs.createDir(dir);


        await fs.writeFile({
          path: `${dir}/test.json`,
          contents: '{"a":1}'
        })
      }
    })()
  },
})
</script>
