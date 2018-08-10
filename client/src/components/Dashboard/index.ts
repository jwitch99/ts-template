import {connect} from 'react-redux'
import Dashboard from './Dashboard'
import {RootState} from '../../redux/root-reducer'
import {bindActionCreators} from 'redux'
import {Dispatch} from '../../redux/types'
import {GetDashboardData} from '../../redux/actions/dashboard'
import cache, {CacheType} from '../../helpers/AppCache'
import {DashboardData} from '../../../../common/searchResults'

const mapStateToProps = (state: RootState) => {
    return ({
        dashboardLoaded: state.search.DASHBOARD.loaded,
        data: cache.get<DashboardData>(CacheType.DASHBOARD)
    })
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        getDashboardData: GetDashboardData
    }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
