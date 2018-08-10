import {ADD_ERROR_MESSAGE, DISMISS_ERROR_MESSAGE} from '../../constants/actionTypes'

import {createAction} from 'typesafe-actions'
import {$Call} from 'utility-types'
import {combineEpics, Epic} from 'redux-observable'

import {RootAction} from '../root-action'
import {RootState} from '../root-reducer'

export const AddErrorMessage = createAction(ADD_ERROR_MESSAGE, (message: string) => {
    return {
        type: ADD_ERROR_MESSAGE,
        message: message,
        key: new Date().getTime()
    }
})

export const DismissErrorMessage = createAction(DISMISS_ERROR_MESSAGE, (key: number) => ({
    type: DISMISS_ERROR_MESSAGE,
    key: key
}))

export type $ErrorHandlerActions =
    $Call<typeof AddErrorMessage> |
    $Call<typeof DismissErrorMessage>

export const addErrorMessage: Epic<RootAction, RootState> =
    (action$, store, {axios}) =>
        action$.ofType(ADD_ERROR_MESSAGE)
            .delay(6000)
            .map(action => DismissErrorMessage(action['key']))

export const epics = combineEpics(addErrorMessage)

