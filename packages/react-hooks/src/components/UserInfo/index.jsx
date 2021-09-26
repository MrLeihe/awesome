import React from 'react'
import { useSelector } from 'react-redux'

function UserInfo() {
  const userInfo = useSelector((state) => state.rootReducer.userInfo)

  return (
    <div>
      <span>姓名：{userInfo.name}</span>
      <span>年龄：{userInfo.age}</span>
    </div>
  )
}

export default UserInfo
