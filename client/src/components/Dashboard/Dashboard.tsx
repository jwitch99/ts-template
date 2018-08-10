import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core'
import {GetDashboardData} from '../../redux/actions/dashboard'
import {DashboardData} from '../../../../common/searchResults'
import './Dashboard.less'

export interface DashboardProps {
    dashboardLoaded: boolean,
    getDashboardData: typeof GetDashboardData,
    data: DashboardData
}

export default class Dashboard extends React.Component<DashboardProps, any> {

    constructor(props: DashboardProps) {
        super(props)
        if (props.dashboardLoaded === false) {
            props.getDashboardData()
        }
    }

    render() {

        let {data, dashboardLoaded} = this.props
        data = data || {}
        return (
            <div className='container -full-height'>
                <div className='-headline'>
                    <Typography variant='title'>Dashboard</Typography>
                </div>
                <div className='-content'>
                    <Grid container id='DashboardContainer'>
                        <Grid item sm={6}>
                            <p style={{textAlign: 'center'}}>Hello</p>
                        </Grid>
                        <Grid item sm={6}>
                            <p style={{textAlign: 'center'}}>World</p>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}



