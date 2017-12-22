import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import myStorage from './static/myStorage'
import {initialState} from './reducers/user'
import './static/weixin'


import App from './App'
let store = configureStore({user:initialState})
render(<Provider store={store}>
    <Router>
    <App/>
    </Router>
</Provider>
, document.getElementById('root'))