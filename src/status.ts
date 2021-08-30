import { ref, computed, watch } from 'vue'
import doma from 'doma'
import http from 'tauri/api/http'
import { APType, APInfo, ENDPOINT, OnlineInfo, OfflineInfo } from './constants'
import { runScript, jsonp } from './utils'

export const html = ref<string>()
export const dom = computed(() => doma(html.value))

export const connected = ref<boolean>()
export const ap = ref<APType>()

watch(dom, () => {
  const title = dom.value.querySelector('title')
  connected.value = title.textContent === '百度一下，你就知道'
})

export const user = ref<OnlineInfo | OfflineInfo>()
watch(connected, async () => {
  if (!connected.value) {
    const script = dom.value.querySelector<HTMLScriptElement>(
      '[type="text/javascript"]'
    )
    runScript(script.text)

    for (const [type, info] of Object.entries(APInfo)) {
      if (window.portal.ServiceIP === info.ServiceIP) {
        ap.value = type
        break
      }
    }
  }

  for (const [type, info] of Object.entries(APInfo)) {
    if (!connected.value && ap.value !== type) continue

    try {
      const callback = await http.get<string>(
        `${info.url}${ENDPOINT.info}?callback=cb`,
        { responseType: 2 }
      )
      user.value = jsonp(callback)

      if (user.value.error === 'ok') {
        ap.value = type
        break
      }
    } catch {
      ap.value = null
    }
  }
})

export const updated = ref<boolean>()
export async function updateConnectionStatus(): Promise<void> {
  updated.value = false
  try {
    html.value = await http.get<string>('http://www.baidu.com', {
      responseType: 2,
    })
  } catch {
    connected.value = false
  }
  updated.value = true
}
