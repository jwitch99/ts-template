import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {Dashboard, Search, Settings} from '@material-ui/icons'
import './SideBar.less'
import {Routes} from '../../helpers/routes'

const SideBar = () => {
    return (
        <div id='Sidebar'>
            <NavLink to={Routes.dashboard.path}><Dashboard/></NavLink>
            <NavLink to={Routes.search.path}><Search/></NavLink>
            <NavLink to={Routes.settings.path}><Settings/></NavLink>
        </div>
    )
}

export default SideBar
