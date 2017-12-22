import * as actionTypes from '../constants/user'

export const initialState = {
  isFetching: false,
  received:false,
  check:false,
  phone:'',
  id:''
}

export default function disk(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USERCHECK_REQUEST_POST:
      return {
        ...state,
        isFetching: true
      }
    case actionTypes.USERCHECK_RECEIVED:
      return {
        ...state,
        isFetching: false,
        received:true,
        check: action.check,
        phone: action.phone,
        id:action.id
      }
    case actionTypes.USERCHECK_ERROR: //如果请求发生意外，则按此处理
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}