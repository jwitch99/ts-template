import {END_VERIFY_AUTH, START_VERIFY_AUTH} from '../../constants/actionTypes'

import {createAction} from 'typesafe-actions'
import {$Call} from 'utility-types'
import {combineEpics, Epic} from 'redux-observable'

import {RootAction} from '../root-action'
import {RootState} from '../root-reducer'
import {ApiRoutes} from '../../helpers/routes'

export const StartVerifyAuth = createAction(START_VERIFY_AUTH)

export const EndVerifyAuth = createAction(END_VERIFY_AUTH,
    (axiosResponse: any, success = true) => {
        let payload = {
            type: END_VERIFY_AUTH,
            success: success
        }

        if (success) {
            payload['permissions'] = axiosResponse.permissions
        } else {
            console.log('Failed verifying authentication', axiosResponse)
        }

        return payload
    })

export type $VerifyAuthActions =
    $Call<typeof StartVerifyAuth> |
    $Call<typeof EndVerifyAuth>

const startVerification: Epic<RootAction, RootState> =
    (action$, store, {axios}) =>
        action$.ofType(START_VERIFY_AUTH)
            .flatMap(() =>
                axios.post(ApiRoutes.verifyAuth)
                    .then((x: any) => EndVerifyAuth(x.data, x.data['authenticated']))
                    .catch((x: any) => EndVerifyAuth(x, false))
            )

export const epics = combineEpics(startVerification)

