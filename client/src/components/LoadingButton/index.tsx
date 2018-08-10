import * as React from 'react'
import {Button, CircularProgress, Theme, withStyles, WithStyles} from '@material-ui/core'
import {StyleRules} from '@material-ui/core/styles'
import {ButtonProps} from '@material-ui/core/Button'

const styles = (theme: Theme): StyleRules => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -18,
        marginLeft: -18,
        width: 18,
        height: 18,
    },
    wrapper: {
        position: 'relative',
    },
})

export type LoadingButtonProps = ButtonProps & {
    loading: boolean
}

type LoadingButtonPropsWithStyles = LoadingButtonProps & WithStyles<keyof ReturnType<typeof styles>>

class _LoadingButton extends React.PureComponent<LoadingButtonPropsWithStyles> {
    render() {
        let {loading, children, classes, ...props} = this.props
        return (
            <div className={classes.wrapper}>
                <Button
                    disabled={loading}
                    {...props}
                >
                    {children}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
            </div>
        )
    }
}

export default withStyles(styles)<LoadingButtonProps>(_LoadingButton)