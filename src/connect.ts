import http from 'tauri/api/http'
import md5 from 'blueimp-md5'
import { sha1, jsonp } from './utils'
import { xEncode } from '../lib/xEncode'
import { encode } from '../lib/jquery-base64'
import { APInfo, ENDPOINT } from './constants'
import { ap, user, connected } from './status'
import { account } from './config'

export async function connect(): Promise<void> {
  const enc_ver = 'srun_bx1'
  const n = '200'
  const type = '1'
  const callback = 'cb'
  const { url, ac_id } = APInfo[ap.value]
  const ip = user.value.online_ip

  let { username, password, isp } = account
  if (isp) username += `@${isp}`

  const challengeURL = new URL(url)
  challengeURL.pathname += ENDPOINT['challenge']
  challengeURL.search = new URLSearchParams({
    username,
    ip,
    callback,
  }).toString()
  const challengeCallback = await http.get<string>(challengeURL.toString(), {
    responseType: 2,
  })
  const { challenge } = jsonp(challengeCallback)

  const infoData = JSON.stringify({
    username,
    password,
    ip,
    acid: ac_id,
    enc_ver,
  })
  const info = `{SRBX1}${encode(xEncode(infoData, challenge))}`

  password = md5(password, challenge)
  const chksum = sha1(
    [, username, password, ac_id, ip, n, type, info].join(challenge)
  )
  password = `{MD5}${password}`

  const loginURL = new URL(url)
  loginURL.pathname += ENDPOINT['portal']
  loginURL.search = new URLSearchParams({
    action: 'login',
    username,
    password,
    ac_id,
    ip,
    chksum,
    info,
    n,
    type,
    callback,
  }).toString()
  const loginCallback = await http.get<string>(loginURL.toString(), {
    responseType: 2,
  })
  const { error, ploy_msg, error_msg } = jsonp(loginCallback)

  if (error === 'ok') connected.value = true
  else console.log(ploy_msg || error_msg)
}

export async function disconnect(): Promise<void> {
  const callback = 'cb'
  const { url, ac_id } = APInfo[ap.value]
  const ip = user.value.online_ip

  const { username } = account

  const logoutURL = new URL(url)
  logoutURL.pathname += ENDPOINT['portal']
  logoutURL.search = new URLSearchParams({
    action: 'logout',
    username,
    ac_id,
    ip,
    callback,
  }).toString()
  const logoutCallback = await http.get<string>(logoutURL.toString(), {
    responseType: 2,
  })
  const { error } = jsonp(logoutCallback)

  if (error === 'ok') connected.value = false
}
