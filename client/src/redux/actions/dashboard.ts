import {GET_DASHBOARD_END, GET_DASHBOARD_START} from '../../constants/actionTypes'

import {createAction} from 'typesafe-actions'
import {$Call} from 'utility-types'
import {combineEpics, Epic} from 'redux-observable'

import {RootAction} from '../root-action'
import {RootState} from '../root-reducer'
import {ApiRoutes} from '../../helpers/routes'
import {Observable} from 'rxjs/Observable'

export const GetDashboardData = createAction(GET_DASHBOARD_START)

export const EndGetDashboardData = createAction(GET_DASHBOARD_END,
    (axiosResponse: any, success = true) => {
        let payload = {
            type: GET_DASHBOARD_END,
            success: success
        }
        if (success) {
            payload['data'] = axiosResponse
        } else {
            console.log('Failed getting dashboard data', axiosResponse)
        }

        return payload
    })

export type $DashboardDataActions =
    $Call<typeof GetDashboardData> |
    $Call<typeof EndGetDashboardData>

export const startGetDashboardData: Epic<RootAction, RootState> =
    (action$, store, {axios}) =>
        action$.ofType(GET_DASHBOARD_START)
            .flatMap(() =>
                axios.get(ApiRoutes.dashboard)
                    .then((x: any) => EndGetDashboardData(x.data))
                    .catch((x: any) => EndGetDashboardData(x, true))
            )


export const epics = combineEpics(startGetDashboardData)

