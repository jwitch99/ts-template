import {Dispatch as ReduxDispatch, Reducer as ReduxReducer} from 'redux'
import {RootState} from './root-reducer'
import {RootAction} from './root-action'
import {AppCache} from '../helpers/AppCache'
import {AxiosInstance} from 'axios'

const axios = require('axios')

export type Dispatch = ReduxDispatch<RootAction>;
export type Reducer = ReduxReducer<RootState, RootAction>;
export type Dependencies = {
    axios: typeof axios | AxiosInstance,
    cache: AppCache
}
