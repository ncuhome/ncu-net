export type APType = 'ncuxg' | 'ncuwlan'

export const APInfo: Record<APType, Record<string, string>> = {
  ncuxg: {
    name: 'NCU-5G/NCU-2.4G',
    url: 'http://222.204.3.154/',
    ServiceIP: 'http://222.204.3.156:8800',
    ac_id: '5',
  },
  ncuwlan: {
    name: 'NCUWLAN',
    url: 'http://222.204.3.221/',
    ServiceIP: '222.204.3.226',
    ac_id: '1',
  },
}

export const ENDPOINT = {
  info: 'cgi-bin/rad_user_info',
  challenge: 'cgi-bin/get_challenge',
  portal: 'cgi-bin/srun_portal',
}

export const ISP = {
  cmcc: '移动',
  unicom: '联通',
  ndcard: '电信',
  ncu: '校园网',
}

export interface OnlineInfo {
  ServerFlag: number
  add_time: number
  all_bytes: number
  bytes_in: number
  bytes_out: number
  checkout_date: number
  domain: string
  error: string
  keepalive_time: number
  online_ip: string
  real_name: string
  remain_seconds: number
  sum_bytes: number
  sum_seconds: number
  sysver: string
  user_balance: number
  user_charge: number
  user_mac: string
  user_name: string
  wallet_balance: number
}

export interface OfflineInfo {
  client_ip: string
  ecode: number
  error: string
  error_msg: string
  online_ip: string
  res: string
  srun_ver: string
  st: number
}
