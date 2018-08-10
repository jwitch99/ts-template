// RootActions
import {LocationChangeAction, RouterAction} from 'react-router-redux'

import {$LoginActions} from './actions/login'
import {$VerifyAuthActions} from './actions/verify-authentication'
import {$DashboardDataActions} from './actions/dashboard'
import {$ErrorHandlerActions} from './actions/handleError'

export type AppAction =
    $LoginActions |
    $VerifyAuthActions |
    $DashboardDataActions |
    $ErrorHandlerActions

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
    | AppAction
    | ReactRouterAction;
