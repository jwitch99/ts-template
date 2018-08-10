import {Store} from 'redux'
import {RootState} from '../redux/root-reducer'
import {get, has, set, unset} from 'lodash'

export class Cache {

    add = <T>(key: string | Array<string | number>, value: T | any, timeout?: number) => {

        set(this._map, key, value)

        if (timeout && timeout > 0) {
            setTimeout(() => unset(key, timeout))
        }

        if (process.env.NODE_ENV === 'development') {
            console.log(key, this._map)
        }
    }

    remove = (key: string | Array<string | number>) => unset(this._map, key)

    has = (key: string | Array<string | number>): boolean => has(this._map, key)

    get = <T>(key: string | Array<string | number>, defaultValue: any = undefined): T | undefined => get(this._map, key, defaultValue)

    protected _map: any

    private store: Store<RootState> | undefined

    constructor() {
        this._map = {}
    }

}

export enum CacheType {
    DASHBOARD = 'DASHBOARD'
}

export class AppCache extends Cache {

    getDataByType = <T>(type: CacheType): Array<T> | undefined => {
        return this.get(type)
    }
}

const instance = new AppCache()

export default instance


