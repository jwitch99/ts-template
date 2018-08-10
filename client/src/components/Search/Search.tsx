import * as React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {Routes} from '../../helpers/routes'
import {Switch} from '../index'

export class Search extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={Routes.connectionsView.path} component={() => <div>Connections View</div>}/>
                    <Redirect to={Routes.connectionsView.path}/>
                </Switch>
            </div>
        )
    }
}
