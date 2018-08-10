import {Carrier, ES, MonitoringSite, RxEs, TxEs} from '../../../common/searchResults'
import {capitalize} from 'lodash'
/**
 * todo: This is most definitely wrong
 * @param {ES} es
 * @returns {number[]}
 */
export const formatLatLong = (es: ES | TxEs | RxEs | MonitoringSite) => {
    let lat = es.Latitude,
        lng = es.Longitude

    if (lng > 180) {
        lng = 360 - lng
    }

    return [lng, lat]
}


export const getVirtualTableHeight = (rows?: Array<any>) => {
    if (rows === undefined || rows.length === 0) {
        return (57 + 48 * (3))
    } else if (rows.length < 10) {
        return 57 + 48 * (rows.length + 1)
    } else {
        return 530
    }
}

export const getStatusClass = (carrier: Carrier) => {
    let state = capitalize(carrier.State)
    switch(state) {
        case 'Reserved':
            return 'purple'
        case 'None':
            return 'grey'
        case 'Preliminary':
            return 'light-blue'
        case 'Activation Scheduled':
            return 'yellow'
        case 'Activated':
            return 'green'
        case 'Deactivation Scheduled':
            return 'orange'
        case 'Deactivated':
            return 'red'
        default:
            if(carrier.State !== undefined)
                console.log('Status not found', carrier.State)
            return 'grey'
    }
}
