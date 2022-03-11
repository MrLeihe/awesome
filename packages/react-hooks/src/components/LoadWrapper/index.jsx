import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Counter from '../Counter'
import UserInfo from '../UserInfo'

function LoadWrapper(props) {
  const [loading, setLoading] = useState(true)
  const [MyComp, setMyComp] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: 'stone', age: 18 })
        }, 2000)
      })
      setLoading(false)
      setMyComp(Counter)
      dispatch({ type: 'user_info', userInfo })
    }

    getUserInfo()

    const log = () => {
      if (count < 2) {
        console.log('execute requestAnimationFrame...')
        requestAnimationFrame(log)
      }
      count++
    }

    let count = 0

    const rafId = requestAnimationFrame(log)

    window.cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      {MyComp ? <MyComp /> : <div>loading...</div>}
      {loading ? <div>加载中...</div> : <UserInfo {...props} />}
    </>
  )
}

export default LoadWrapper
