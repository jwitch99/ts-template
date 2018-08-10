import {combineEpics} from 'redux-observable'

import {epics as loginEpics} from './actions/login'
import {epics as verifyAuthentication} from './actions/verify-authentication'
import {epics as dashboard} from './actions/dashboard'
import {epics as handleErrors} from './actions/handleError'

export const rootEpic = combineEpics(
    loginEpics,
    verifyAuthentication,
    dashboard,
    handleErrors,
)
