self.onmessage = (event) => {
  console.log('接收到页面消息：', event)

  self.postMessage('worker 线程已收到消息...')
}
