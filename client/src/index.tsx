import * as React from 'react'
import {AppContainer} from 'react-hot-loader'
import * as ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import configureStore from './helpers/configureStore'

import Root from './Root'
import './helpers/extensions'

const history = createHistory()
const store = configureStore(undefined, history)



const render = (root: any) => {
    ReactDOM.render(
        <AppContainer>
            {root}
        </AppContainer>,
        document.getElementById('root')
    )
}

render(<Root history={history} store={store}/>)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./Root', () => {
        const _Root = require('./Root').default
        render(<_Root history={history} store={store}/>)
    })
}
