import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import LoadWrapper from './components/LoadWrapper'

function App() {
  return (
    <Provider store={store}>
      <LoadWrapper />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
