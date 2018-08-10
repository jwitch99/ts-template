import {createMuiTheme} from '@material-ui/core'
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4d8c31'
        },
        secondary: {
            main: '#37464f'
        }
    },
    typography: {
        fontFamily: 'Lato, sans-serif',
        headline: {
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: 400
        },
        title: {
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: 600
        },
        body2: {
            fontWeight: 600
        },
        display1: {
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#354052'
        }
    },
    overrides: {
        MuiChip: {
            root: {
                margin: '0 10px',
                fontWeight: 'bold',
                fontSize: '14px',
                textAlign: 'center',
                letterSpacing: 0.103125,
                backgroundColor: '#DCE0E6',
                color: '#000000b3'
            }
        }
    }
})

console.log('Theme', theme)

export default theme
