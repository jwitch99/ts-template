import * as React from 'react'
import {Provider, Store} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {App} from './components'
import {History} from 'history'
import theme from './styles/theme'
import {MuiThemeProvider} from '@material-ui/core'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import './rxjs-imports'

interface RootProps {
    store: Store<any>,
    history: History
}

export default class Root extends React.Component<RootProps, any> {
    render() {
        return (
            <Provider store={this.props.store}>
                <ConnectedRouter history={this.props.history}>
                    <MuiThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <App/>
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
        )
    }
}
