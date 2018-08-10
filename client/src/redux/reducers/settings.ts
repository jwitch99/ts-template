import {AppAction} from '../root-action'


export type ISettingState = {
}

const initialState: ISettingState = {
}

export default function reducer(state: ISettingState = initialState, action: AppAction): ISettingState {
    switch (action.type) {

        default:
            return state
    }
}
