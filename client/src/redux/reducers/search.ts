import {GET_DASHBOARD_END, GET_DASHBOARD_START, START_LOGIN, START_VERIFY_AUTH,} from '../../constants/actionTypes'
import cache, {CacheType} from '../../helpers/AppCache'
import {DashboardData,} from '../../../../common/searchResults'

export type PaginatedType = {
    loaded: {
        [page: number]: boolean
    },
    loading: boolean,
    currentPage: number,
    pageSize: number
}

export interface ISearchState {
    [CacheType.DASHBOARD]: {
        loaded: boolean
    }

    [primaryKey: string]: any
}

const initialState: ISearchState = {
    [CacheType.DASHBOARD]: {
        loaded: false,
    },
}

export default function reducer(state: ISearchState = initialState, action): ISearchState {
    switch (action.type) {

        case GET_DASHBOARD_END:
            let data = action['data'] as DashboardData
            if (action['success']) {
                cache.add(CacheType.DASHBOARD, data)
            }
            return {
                ...state,
                [CacheType.DASHBOARD]: {
                    loaded: true,
                },
            }
        case GET_DASHBOARD_START:
            //Set default data
            cache.add(CacheType.DASHBOARD, {})

            return {
                ...state,
                [CacheType.DASHBOARD]: {
                    loaded: false,
                },
            }
        case START_VERIFY_AUTH:
        case START_LOGIN:
        default:
            return state
    }
}
