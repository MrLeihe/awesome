- html parser，会把标签解析为一个个的 token，维护着一个 token 栈，解析过程是边下载边解析，网络进程下载好的资源会通过进程间通信，把数据传输给渲染进程，然后渲染进程的 html 解析器就开始解析，生成 dom 树
- 概念：start tag 、end tag
- dom 解析过程中，遇到 script 标签，会执行 js 代码，阻塞 html parser 过程，并且在执行 js 代码之前，会加载
  css 文件，js 会被阻塞
- 所以可以通过给 script 标签添加 async 和 defer 属性，来延迟加载，避免阻塞 dom 渲染，async 是在加载完成后就立即执行，执行时机是不确定的，而 defer 是在 DOMContentLoaded 触发前执行
