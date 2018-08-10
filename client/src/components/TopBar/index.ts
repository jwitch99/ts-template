import {connect} from 'react-redux'
import TopBar from './TopBar'
import {RouterState} from 'react-router-redux'
import {RootState} from '../../redux/root-reducer'

function mapStateToProps(state: RootState) {
    return {
        router: state.router
    }
}

export interface IStateProps {
    router: RouterState
}

export type ITopBarProps = IStateProps

export default connect<IStateProps, void, any>(
    mapStateToProps
)(TopBar)
