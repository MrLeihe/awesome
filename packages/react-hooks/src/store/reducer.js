import { combineReducers } from 'redux'

const initialState = {
  userInfo: {},
  count: 0,
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'plus':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'minus':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'user_info':
      return {
        ...state,
        userInfo: action.userInfo,
      }
    case 'reset_user_info':
      return {
        ...state,
        userInfo: {},
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  rootReducer,
})

export default reducer
