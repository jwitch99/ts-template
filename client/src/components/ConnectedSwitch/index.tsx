import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import {RootState} from '../../redux/root-reducer'
import {SwitchProps} from 'react-router'

const mapStateToProps = (state:RootState) => ({
    location: state.router.location === null
        ? undefined
        : state.router.location
})

const ConnectedSwitch = connect<SwitchProps>(mapStateToProps)(Switch)

export default ConnectedSwitch
