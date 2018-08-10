import * as React from 'react'
import {Typography} from '@material-ui/core'

export class StyleGuide extends React.Component {
    render() {

        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    Headline
                </Typography>
                <Typography variant="title" gutterBottom>
                    Title
                </Typography>
                <Typography variant="display1" gutterBottom>
                    Display 1 || Subtitle
                </Typography>
                <Typography variant="subheading" gutterBottom>
                    Subheading
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Body 2
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Body 1
                </Typography>
                <Typography variant="caption" gutterBottom align="center">
                    Caption
                </Typography>
                <Typography gutterBottom noWrap>
                    {`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        `}
                </Typography>
                <Typography variant="button">
                    Button
                </Typography>
            </div>
        )

    }
}
