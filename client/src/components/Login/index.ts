import {StartLogin} from '../../redux/actions/login'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Dispatch} from '../../redux/types'
import {RootState} from '../../redux/root-reducer'
import LoginPage from './LoginPage'

const mapStateToProps = (state: RootState) => ({
    isLoggedIn: state.app.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    login: StartLogin
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
