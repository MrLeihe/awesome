import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import './index.css'

function FiberNode(val) {
  this.val = val
  this.next = null
}

let head = new FiberNode()
let cur = head
let unMountCallbacks = []

function useState(initialState) {
  const node = cur.next || new FiberNode(initialState)
  const setState = (newState) => {
    node.val = newState
    render()
  }
  updateCurNode(node)
  return [node.val, setState]
}

function useEffect(effect, deps) {
  const node = cur.next || new FiberNode(null)
  const memoDeps = node.val
  const hasDepsChanged = memoDeps ? !deps.every((dep, i) => dep === memoDeps[i]) : true
  if (hasDepsChanged) {
    let cb = effect()
    if (typeof cb === 'function') {
      unMountCallbacks.push(cb)
    }
    node.val = deps
  }
  updateCurNode(node)
}

function updateCurNode(node) {
  if (cur.next === null) {
    cur.next = node
  }
  cur = cur.next
}

// 组件卸载或者重新渲染前执行
function execUnMountCallbacks() {
  if (unMountCallbacks.length) {
    unMountCallbacks.forEach((cb) => cb())
    unMountCallbacks.length = 0
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)

  useEffect(() => {
    console.log('useEffect....')
    return () => {}
  }, [])

  return (
    <div>
      <div>{count}</div>
      <p>{num}</p>
      <Button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点击
      </Button>
      <Button
        onClick={() => {
          setNum(num + 1)
        }}
      >
        修改num
      </Button>
    </div>
  )
}

function render() {
  cur = head
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
