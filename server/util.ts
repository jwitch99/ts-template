import {Response} from 'express'
import serverConfig from '../config/server'
import {IRequest} from './types/types'
import {ArgumentParser} from 'argparse'
import {errors} from '../common/errors'
import {get} from 'lodash'
import * as moment from 'moment'
import {DefaultDateFormat} from '../common/constants'
import jwt = require('jsonwebtoken')

/**
 * Logs all application errors to console
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

/**
 * Handles application errors, sends a response back to the client
 * depending on how it was requested
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function clientErrorHandler(err, req, res, next) {
    const response = getErrorResponse(err, req.get('isDev'))
    res.status(response.code).send(response.message)
}

export function getErrorResponse(err, isDev: boolean): { code: number, message: string } {

    if (isDev) {
        return {
            code: errors.UNKNOWN,
            message: JSON.stringify(err)
        }
    }

    return {
        code: errors.UNKNOWN,
        message: 'Server Failed. Contact your administrator'
    }
}

/**
 * Handles Joi schema errors
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function handleJoiError(err, req, res, next) {
    if (get(err, 'error.isJoi', false)) {
        // Return a custom 400 json response
        res.status(400).json({
            type: err.type, // "query", "headers", "body", or "params"
            message: err.error.toString(),
            data: err.error.details
        })
    } else {
        // pass on to another error handler
        next(err)
    }
}

/**
 * Verifies user authentication
 * Decodes user token into the request
 * @param {IRequest} req
 * @param {e.Response} res
 * @param {() => void} next
 * @returns {Response}
 */
export function verifyTokenMiddleware(req: IRequest, res: Response, next: () => void) {
    // check header or url parameters or post parameters for token
    const token = req.cookies[serverConfig.cookieName]

    // decode token
    if (token) {
        // verifies secret and checks expiration
        jwt.verify(token, serverConfig.signingKey, (err, decoded) => {
            if (err) {
                res.status(403).json({authenticated: false, reason: err})
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded
                next()
            }
        })
    } else {
        // Return an error if not authenticated
        return res.status(403).send({
            message: 'No token provided.'
        })
    }
}


/**
 * Increment the page number to match express-paginator which
 * is indexed starting at 1 whereas the client starts at 0
 */
export function incrementPageNumber(req: IRequest, res: Response, next: () => void) {
    if (req.query.page) {
        req.query.page = (+req.query.page + 1).toString()
    }

    next()
}


/**
 * Creates application parser with configurable options
 * @returns {any}
 */
export function getAppParser() {
    const parser = new ArgumentParser({
        addHelp: true,
        description: 'Start an express server for webpack dev or prod'
    })

    parser.addArgument(['-m', '--mode'], {
        help: 'Set server mode. Default: dev',
        dest: 'mode',
        defaultValue: 'dev',
        choices: ['dev', 'prod']
    })

    parser.addArgument(['--host'], {
        help: 'Set server host',
        dest: 'host',
        defaultValue: serverConfig.host
    })

    parser.addArgument(['-r', '--routes'], {
        help: 'List all application endpoints',
        dest: 'listRoutes',
        action: 'storeTrue'
    })

    parser.addArgument(['-p', '--port'], {
        help: 'Defines port number to run application',
        dest: 'port',
        defaultValue: serverConfig.port
    })

    let args = parser.parseArgs()

    args.isDev = args.mode === 'dev'

    //Check process env variables
    if (process.env.MODE) {
        args.mode = process.env.MODE
    } else {
        process.env.MODE = args.mode
    }

    if (process.env.PORT) {
        args.port = process.env.PORT
    } else {
        process.env.PORT = args.port
    }

    if (process.env.HOST) {
        args.host = process.env.HOST
    } else {
        process.env.HOST = args.host
    }

    return args
}

export function generateSessionId() {
    return s4() + s4() + s4() + s4() +
        s4() + s4()
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
}

export function convertToDefaultDateFormat(date: string): string {
    return moment(date).format(DefaultDateFormat).toString()
}
