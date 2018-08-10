import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import {RootReducer} from '../redux/root-reducer'
import instance from './AppCache'
import {createEpicMiddleware} from 'redux-observable'
import {rootEpic} from '../redux/root-epic'
import {$Window} from '../types/globals'

const axios = require('axios')
let composeEnhancers = compose

let defaultState = {
    app: {
        isProd: true
    }
}

if (process.env.NODE_ENV === 'development') {
    defaultState.app.isProd = false
    if (window && (window as $Window).__REDUX_DEVTOOLS_EXTENSION__) {
        composeEnhancers = (window as $Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
    }
}

export default function configureStore(initialState: any, history: any) {
    const router = routerMiddleware(history)
    const middleware = [
        router,
        ({dispatch}) => next => action => {
            Array.isArray(action)
                ? action.filter(Boolean).map(dispatch)
                : next(action)
        },
        createEpicMiddleware(rootEpic, {
            dependencies: {
                cache: instance,
                axios: axios.create({
                    baseURL: window.location.origin
                })
            }
        })
    ]

    if (process.env.NODE_ENV === 'development') {
        const {createLogger} = require('redux-logger')
        const logger = createLogger({collapsed: true, diff: true})
        middleware.push(logger)
    }

    const enhancers = composeEnhancers(
        applyMiddleware(...middleware)
    )

    const store = createStore(
        RootReducer,
        initialState || defaultState,
        enhancers
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../redux/root-reducer', () => {
            const nextRootReducer = require('../redux/root-reducer').default // eslint-disable-line
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
