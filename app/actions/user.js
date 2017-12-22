import * as actionTypes from '../constants/user'
import {user_check} from "../constants/urls";

const requestPosts = () => ({
  type: actionTypes.USERCHECK_REQUEST_POST
})

const received = (check,phone,id) =>({
  type: actionTypes.USERCHECK_RECEIVED,
  check,
  phone,
  id
})

const receivedError = () =>({
  type: actionTypes.USERCHECK_ERROR
})

const fetchPosts = phone => dispatch => {
  dispatch(requestPosts())
  let url = `${user_check}?phone=${phone}`

  return fetch(url)
      .then(response => response.json())
      .then(json => {
        if(json.error==='1'){
          dispatch(received(true,phone,json.data[0].id))
        }
        else{
          alert(json.msg)
          dispatch(received(false,phone,''))
        }
      })
      .catch(err=>{
        alert('网络连接错误，请稍后再试')
        dispatch(receivedError())
      })
}

const shouldFetchPosts = (state) => {
  return !state.user.isFetching;
}

export const fetchPostsIfNeeded = phone => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts(phone))
  }
}