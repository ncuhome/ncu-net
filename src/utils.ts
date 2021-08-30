import SHA from 'jssha'

export function runScript(source: string): void {
  const script = document.createElement('script')
  script.text = source
  document.body.appendChild(script)
}

// 'foo({ "bar": "baz" })' => { bar: 'baz' }
export function jsonp(callback: string) {
  return JSON.parse(callback.slice(callback.indexOf('(') + 1, -1))
}

export function sha1(source: string): string {
  const sha = new SHA('SHA-1', 'TEXT')
  sha.update(source)
  return sha.getHash('HEX')
}
