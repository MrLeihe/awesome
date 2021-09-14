import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function App() {
  return <div title="test">Hello world</div>
}

const element = React.createElement('div', { title: 'test' }, 'Hello world')

function render() {
  const node = document.createElement(element.type)
  node.title = element.props.title
  const text = document.createTextNode(element.props.children)
  node.appendChild(text)
  const container = document.getElementById('root')
  container.appendChild(node)
}

render()

// ReactDOM.render(<App />, document.getElementById('root'))
