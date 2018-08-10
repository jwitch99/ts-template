import BaseRouter from './base.controller'
import {incrementPageNumber, verifyTokenMiddleware} from '../util'
import SeriesController from './series.controller'
import * as bodyParser from 'body-parser'

export default class ApiController extends BaseRouter {
    name: string = ApiController.name

    subControllers = [
        new SeriesController(this, '/dashboard')
    ]

    /**
     * Verifies authentication.
     * Since api controller is under a firewall
     * this method will only be called on success.
     * @param req
     * @param res
     */
    verifyAuthenticated = (req, res) => {
        res.json({
            authenticated: true,
            fullName: req.decoded.fullName,
            permissions: req.decoded.permissions
        })
    }

    services() {
        return {
            'POST /verify-auth': this.verifyAuthenticated
        }
    }

    middlewares() {
        return [
            bodyParser.json(),
            verifyTokenMiddleware,
            incrementPageNumber
        ]
    }
}
