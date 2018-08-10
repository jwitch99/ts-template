import {combineReducers} from 'redux'
import {routerReducer, RouterState} from 'react-router-redux'
import appReducer, {IAppState} from './reducers/app'
import searchReducer, {ISearchState} from './reducers/search'
import {RootAction} from './root-action'
import errorReducer, {IErrorState} from './reducers/errors'

export interface RootState {
    router: RouterState
    app: IAppState,
    search: ISearchState,
    errors: IErrorState,
}

export const RootReducer = combineReducers<RootState, RootAction>({
    router: routerReducer,
    app: appReducer,
    search: searchReducer,
    errors: errorReducer,
})
