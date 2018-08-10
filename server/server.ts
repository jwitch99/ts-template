import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import AppController from './controllers/app.controller'
import chalk from 'chalk'
import {clientErrorHandler, handleJoiError, logErrors} from './util'
import {Config} from './types/types'
import BaseController from './controllers/base.controller'
import * as apiCache from 'apicache'
import cookieParser = require('cookie-parser')
import morgan = require('morgan')
import fallback = require('express-history-api-fallback')
import helmet = require('helmet')

const PUBLIC_ASSETS = require('path').join(__dirname, '../client/public')

export default class Server {
    app: express.Application

    server: http.Server

    controller: BaseController

    config: Config

    static isDev: boolean = false

    constructor(config: Config) {
        this.config = config
        this.app = express()
        this.controller = new AppController()
        this.configure(config)
    }

    private static getLogger(config: Config) {
        let logger
        if (config.isDev) {
            logger = morgan('dev')
        } else {
            logger = morgan('combined', {
                skip: (req, res) => {
                    //Skip successful responses
                    return res.statusCode < 400
                }
            })
        }

        return logger
    }

    listRoutes() {
        this.controller.listRoutes()
    }

    configure(config: Config) {
        // Set express environment
        this.app.set('env', config.isDev ? 'development' : 'production')
        this.app.set('isDev', config.isDev)

        //Add body parsing, url decoding, and cookie parsing
        this.app.use(helmet())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(cookieParser())
        this.app.use(Server.getLogger(config))

        // Set public assets and node directory
        this.app.use(express.static(PUBLIC_ASSETS))

        //Setup controller
        apiCache.options({debug: config.isDev})
        BaseController.isDev = config.isDev
        BaseController.cache = apiCache
        BaseController.setCacheMiddleware(apiCache.middleware)
        this.controller.init(this.app)

        //Add default page
        this.app.use(fallback('index.html', {root: PUBLIC_ASSETS}))

        //Add error handling
        this.app.use(logErrors)
        this.app.use(handleJoiError)
        this.app.use(clientErrorHandler)
    }

    start(port?: number) {
        //Start the server at set port
        this.server = this.app.listen(port || this.config.port, () => {
            console.log(chalk.green(`\n[${this.app.get('env')}]\tRunning at ${chalk.bold(`http://localhost:${this.config.port}`)}`))
            console.log('\nPress CTRL-C to stop\n')
        })
    }

    stop(cb?: Function) {
        this.server.close(cb)
    }
}
