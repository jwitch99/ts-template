import {RootState} from '../redux/root-reducer'
import {Dispatch} from '../redux/types'

declare interface $Window extends Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare interface NodeModule {
    hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
    import<T = any>(module: string): Promise<T>
}

declare var System: System

declare interface IStore {
    getState: () => RootState,
    dispatch: Dispatch
}


declare global {
    interface NumberConstructor {
        _format(n?: number): string
    }

    const $: any
}
