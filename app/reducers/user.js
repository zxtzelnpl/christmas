import * as actionTypes from '../constants/user'

export const initialState = {
  isFetching: false,
  received:false,
  check:false,/**需要删除，改为false**/
  phone:'',/**需要删除**/
  id:'',/**需要删除**/
  prize:'0',
  err_msg:''
}

export default function disk(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USERCHECK_REQUEST_POST:
      return {
        ...state,
        isFetching: true,
        err_msg:''
      }
    case actionTypes.USERCHECK_RECEIVED:
      return {
        ...state,
        isFetching: false,
        received:true,
        check: action.check,
        phone: action.phone,
        id:action.id,
        prize:action.prize,
        err_msg:''
      }
    case actionTypes.USERCHECK_ERROR: //如果请求发生意外，则按此处理
      return {
        ...state,
        isFetching: false,
        err_msg:action.err_msg
      }
    default:
      return state
  }
}