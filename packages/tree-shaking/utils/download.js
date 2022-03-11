export const downloadFile = (url) => {
  // if (url) window.location.href = url
  var xmlHttp = null
  if (window.XMLHttpRequest) {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlHttp = new XMLHttpRequest()
  }
  if (xmlHttp != null) {
    xmlHttp.open('get', url, true)
    xmlHttp.responseType = 'blob' //关键
    xmlHttp.send()
    xmlHttp.onreadystatechange = doResult //设置回调函数
  }
  function doResult() {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        let urls = url.split('/')
        if (isEmpty(urls)) return
        window.download(xmlHttp.response, '苏打优选核销系统.html', 'text/html')
      }
    }
  }
}
