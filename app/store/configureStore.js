import { createStore,applyMiddleware,compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

let composeEnhancers  = compose
const middleware = [ thunk ]

if (typeof __DEV__!== 'undefined'&&__DEV__) {
    middleware.push(createLogger())
    if(typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__==='function'){
        composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(...middleware)))
    return store
}