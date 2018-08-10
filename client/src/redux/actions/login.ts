import {END_LOGIN, START_LOGIN} from '../../constants/actionTypes'

import {createAction} from 'typesafe-actions'
import {$Call} from 'utility-types'
import {combineEpics, Epic} from 'redux-observable'

import {RootAction} from '../root-action'
import {RootState} from '../root-reducer'
import {ApiRoutes} from '../../helpers/routes'
import {AddErrorMessage} from './handleError'
import {get} from 'lodash'

export const StartLogin = createAction(START_LOGIN,
    (username: string, password: string) => ({
        type: START_LOGIN,
        username: username,
        password: password
    }))

export const EndLogin = createAction(END_LOGIN,
    (axiosResponse: any, success = true) => {
        let payload = {
            type: END_LOGIN,
            success: success,
        }

        if (success) {
            payload['permissions'] = axiosResponse.permisssions
        } else {
            console.log('Failed logging in', axiosResponse)
        }

        return payload
    })

export type $LoginActions =
    $Call<typeof StartLogin> |
    $Call<typeof EndLogin>

export const startLogin: Epic<RootAction, RootState> =
    (action$, store, {axios}) =>
        action$.ofType(START_LOGIN)
            .mergeMap((action: any) =>
                axios.post(ApiRoutes.auth, {
                    username: action.username,
                    password: action.password
                })
                    .then((x: any) => EndLogin(x.data))
                    .catch((x: any) => [
                        EndLogin(x, false),
                        AddErrorMessage(get(x, 'response.data.message', 'Server Error, try again'))
                    ])
            )

export const epics = combineEpics(startLogin)

