import {END_LOGIN, END_VERIFY_AUTH, LoadingTypes, START_LOGIN, START_VERIFY_AUTH} from '../../constants/actionTypes'

export interface IAppState {
    isProd: boolean,
    isLoggedIn: LoadingTypes,
    permissions: {
        dashboard: boolean
    },
}

const initialState: IAppState = {
    isProd: true,
    isLoggedIn: LoadingTypes.UNREQUESTED,
    permissions: {
        dashboard: false,
    }
}

export default function reducer(state: IAppState, action: any) {
    switch (action.type) {
        case END_VERIFY_AUTH:
        case END_LOGIN:
            return {
                ...state,
                permissions: action.permissions,
                isLoggedIn: action.success
                    ? LoadingTypes.LOADED
                    : LoadingTypes.UNREQUESTED,
            }
        case START_LOGIN:
            return {
                ...state,
                isLoggedIn: LoadingTypes.LOADING,
            }
        case START_VERIFY_AUTH:
        default:
            return {
                ...initialState,
                ...state,
            }
    }
}
