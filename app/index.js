import 'es6-promise'
import 'whatwg-fetch'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {initialState} from './reducers/user'


import App from './App'

let store = configureStore({user: initialState})
render(<Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'))