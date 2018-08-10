import * as React from 'react'
import {TextField, Typography} from '@material-ui/core'
import './LoginPage.less'
import {StartLogin} from '../../redux/actions/login'
import {Clear} from '@material-ui/icons'
import {LoadingTypes} from '../../constants/actionTypes'
import LoadingButton from '../LoadingButton'

const logo = require('../../../public/images/logo.png')

export interface ILoginPageProps {
    login: typeof StartLogin,
    isLoggedIn: LoadingTypes
}

export default class LoginPage extends React.Component<ILoginPageProps, any> {

    state = {
        username: 'admin',
        password: 'admin',
        forgotPasswordOpen: false,
        formHeight: 0,
    }

    loginFormNode: any

    formHeightTimeout: any

    handleChange = (name: string) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        })
    }

    login = () => {
        this.props.login(this.state.username, this.state.password)
    }

    toggleForgotPassword = () => this.setState({forgotPasswordOpen: !this.state.forgotPasswordOpen})

    constructor(props: ILoginPageProps) {
        super(props)
        this.loginFormNode = React.createRef()
    }

    componentDidMount() {
        //Get form node height
        this.formHeightTimeout = setTimeout(() => {
            this.setState({
                formHeight: this.loginFormNode.current
                            ? this.loginFormNode.current.clientHeight
                            : 0,
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.formHeightTimeout)
    }

    render() {

        let {isLoggedIn} = this.props
        return (
            <div id='LoginPage'>
                <img id='logo' src={logo}/>
                <Typography variant='headline' gutterBottom align='center'>
                    Amazing Application
                </Typography>
                <form ref={this.loginFormNode}>
                    <Typography variant='title' gutterBottom>
                        Login
                    </Typography>
                    <div className='fields'>
                        <TextField
                            id='username'
                            label='Username'
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin='dense'
                        />
                        <TextField
                            id='password'
                            label='Password'
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin='dense'
                            type='password'
                        />
                    </div>
                    <div>
                        <LoadingButton variant='raised'
                                       color='primary'
                                       onClick={this.login}
                                       loading={isLoggedIn === LoadingTypes.LOADING}
                        >
                            Log In
                        </LoadingButton>
                    </div>
                    <Typography id='ForgotPasswordText' variant='caption' gutterBottom
                                onClick={this.toggleForgotPassword}>
                        Forgot your password?
                    </Typography>
                    <div id='ForgotPassword' className={this.state.forgotPasswordOpen ? '' : 'closed'}
                         style={{maxHeight: `${this.state.formHeight}px`}}
                    >
                        <Clear onClick={this.toggleForgotPassword}/>
                        <Typography variant='title'>
                            Change Password
                        </Typography>
                        <Typography>
                            You must contact your administrator to change your password
                        </Typography>
                    </div>
                </form>
            </div>
        )
    }
}
