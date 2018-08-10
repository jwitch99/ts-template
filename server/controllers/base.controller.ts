import {Request, Response, Router} from 'express'
import chalk from 'chalk'
import axios, {AxiosInstance} from 'axios'
import {Options} from 'apicache'
import _ = require('lodash')
import joi = require('express-joi-validation')
import paginate = require('express-paginate')

const expressValidator = joi({passError: true})


class BaseController {

    static validator = expressValidator

    static axios: AxiosInstance = axios

    static defaultPaginator = paginate.middleware(10, 50)

    static isDev: boolean = false

    static cache: any

    parentController: BaseController | null

    pathPrefix: string

    router: Router

    subControllers: Array<BaseController> = []

    name: string = BaseController.name

    private static _cacheMiddleware: (duration?: string,
                                      toggleMiddleware?: any,
                                      localOptions?: Options) => any


    /**
     * Sends a response formatted for pagination
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {Array<any>} data
     * @param mapData
     */
    sendPaginatedResponse = <P, T>(req: Request, res: Response, data: Array<P | T> | P | T, mapData?: (el: P) => T) => {

        let _data: Array<T | P> = Array.isArray(data) ? data : [data]

        let totalCount = _data.length

        //Slice data
        if (req.query.limit > 0)
            _data = _data.slice(req['skip'], req['skip'] + req.query.limit)

        //Map if provided
        if (mapData) {
            _data = _data.map(mapData)
        }

        //Send response
        res.json({
            data: _data,
            hasMore: req.query.limit > 0 ? paginate.hasNextPages(req)(totalCount) : false,
            pageCount: req.query.limit > 0 ? Math.ceil(totalCount / req.query.limit) : totalCount,
            totalCount: totalCount,
        })
    }

    constructor(app?: BaseController, pathPrefix: string = '') {
        this.parentController = app
        this.pathPrefix = pathPrefix
        this.router = Router()
        this.setup()
    }

    static getCacheMiddleware(duration?: string, toggleMiddleware?: any, localOptions?: Options): () => any {
        const onlyStatus200 = (req, res) => res.statusCode === 200
        return this._cacheMiddleware(duration, onlyStatus200)
    }

    static setCacheMiddleware(value: (duration?: string, toggleMiddleware?: any, localOptions?: Options) => any) {
        this._cacheMiddleware = value
    }

    /**
     * Initializes all routers and sub-routers
     * @param {e.Router} express
     */
    init(express?: Router) {
        this.registerMiddleware()
        this.registerServices()
        this.registerRouter()

        this.subControllers.forEach(router => {
            router.init()
        })

        if (express) {
            express.use(this.router)
        }
    }

    /**
     * Must overwrite in subclass
     * Example = {
   * 	'POST login/:token' => this.getToken,
   * 	'users' => this.getUsers
   * }
     * @returns {{}}
     */
    services(): Object {
        return []
    }

    /**
     * Must overwrite in subclass
     * Return an array of functions to act as router middleware
     * Order matters
     * @returns []
     */
    middlewares(): Array<any> {
        return []
    }

    /**
     * Registers all router middleware in order
     */
    registerMiddleware() {
        this.middlewares().forEach(func => this.router.use(func))
    }

    /**
     * Registers all the routes provided in the services property
     */
    registerServices() {
        _.forEach(this.services(), (service, path: string) => {
            let pathItems = path.split(' ')
            let verb = (pathItems.length > 1 ? pathItems[0] : 'get').toLowerCase()
            path = (pathItems.length > 1 ? pathItems[1] : path)
            if (_.isArray(service)) {
                this.router[verb](path, ...service)
            } else {
                this.router[verb](path, service)
            }
        })
    }

    /**
     * Registers internal router with parent controller router
     */
    registerRouter() {
        if (this.parentController) {
            this.parentController.router.use(this.pathPrefix, this.router)
        }
    }

    /**
     * Override to perform any other operations on the router
     */
    setup() {
    }

    /**
     * Helper method to view all routes in the application
     * @param {string} prefix
     * @param {string} pathPrefix
     */
    listRoutes(prefix: string = '', pathPrefix = '') {

        console.log(prefix + chalk.green(`${this.name}\t`))

        let routes = _.map(_.filter(this.router.stack, item => item.route != undefined), function (route) {
            return {
                path: route.route.path,
                method: Object.keys(route.route.methods)[0],
            }
        })

        _.each(routes, (route) => {
            console.log(`${prefix}\t${chalk.yellow(route.method.toUpperCase())}  ${pathPrefix}${this.pathPrefix}${route.path}`)
        })

        this.subControllers.forEach(controller => controller.listRoutes(prefix + '\t', this.pathPrefix))
    }
}

export default BaseController
