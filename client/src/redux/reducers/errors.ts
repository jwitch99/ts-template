import {ADD_ERROR_MESSAGE, DISMISS_ERROR_MESSAGE} from '../../constants/actionTypes'

export interface Message {
    message: string,
    key: number
}

export interface IErrorState {
    messages: Message[],
}

const initialState: IErrorState = {
    messages: []
}

export default function reducer(state: IErrorState = initialState, action: any) {
    let messages: Message[] = []
    switch (action.type) {
        case ADD_ERROR_MESSAGE:
            messages = [...state.messages]
            messages.push({
                message: action.message,
                key: action.key
            })
            return {
                ...state,
                messages
            }
        case DISMISS_ERROR_MESSAGE:
            messages = state
                .messages
                .filter(m => m.key !== action['key'])
            return {
                ...state,
                messages
            }
        default:
            return state
    }
}
