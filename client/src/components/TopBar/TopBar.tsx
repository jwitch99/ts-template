import * as React from 'react'
import {NavLink, Route} from 'react-router-dom'
import {ITopBarProps} from './index'
import './TopBar.less'
import {Route as $Route, Routes} from '../../helpers/routes'
import Avatar from '@material-ui/core/Avatar';

const logo = require('../../../public/images/logo.png')




export default class TopBar extends React.Component<ITopBarProps, any> {

    renderRoutes = (items: Array<$Route>) => {
        let links = items.map((item, i) => <NavLink key={i} to={item.path}>{item.name}</NavLink>)
        return <nav>{links}</nav>
    }

    getSearchMenu = () => {
        return this.renderRoutes([
            Routes.connectionsView
        ])
    }

    getDashboardMenu = () => {
        return this.renderRoutes([
            Routes.dashboard
        ])
    }

    render() {


        return (
            <div id='TopBar'>
                <img id='logo' className='small' src={logo}/>
                <Route path={Routes.search.path} render={this.getSearchMenu}/>
                <Route path={Routes.dashboard.path} render={this.getDashboardMenu}/>
                <div id='ProfileAvatar'>
                    <Avatar>JW</Avatar>
                    Jonathan Witchard
                </div>
            </div>


        )
    }
}
