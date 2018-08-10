import * as React from 'react'
import {AccessTime, ChevronLeft, ChevronRight, Event} from '@material-ui/icons'
import {default as MaterialDateTimePicker} from 'material-ui-pickers/DateTimePicker'
import {default as MaterialDatePicker} from 'material-ui-pickers/DatePicker'
import {DateTimePickerWrapperProps} from 'material-ui-pickers/DateTimePicker/DateTimePickerWrapper'

export class DateTimePicker extends React.PureComponent<DateTimePickerWrapperProps> {
    render() {

        return (
            <MaterialDateTimePicker
                leftArrowIcon={<ChevronLeft/>}
                rightArrowIcon={<ChevronRight/>}
                dateRangeIcon={<Event/>}
                timeIcon={<AccessTime/>}
                {...this.props}
            />
        )
    }
}

export class DatePicker extends React.Component<DateTimePickerWrapperProps & { className?: string }> {
    render() {
        const {className, ..._props} = this.props
        return (
            <div className={className}>
                <MaterialDatePicker
                    leftArrowIcon={<ChevronLeft/>}
                    rightArrowIcon={<ChevronRight/>}
                    {..._props}
                />
            </div>
        )
    }
}
