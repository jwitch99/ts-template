import {Request, Response} from 'express'
import BaseRouter from './base.controller'
import serverConfig from '../../config/server'
import ApiController from './api.controller'
import {generateSessionId} from '../util'
import jwt = require('jsonwebtoken')

export default class AppController extends BaseRouter {
    name = AppController.name

    subControllers = [
        new ApiController(this, '/api')
    ]

    /**
     * Logs out user by erasing cookie token
     * @param req
     * @param res
     */
    logout = (req, res) => {
        res.clearCookie(serverConfig.cookieName)
        res.json()
    }

    /**
     * Authenticates user with ECMWebService
     * @param {e.Request} req
     * @param {e.Response} res
     * @param next
     */
    authenticate = (req: Request, res: Response, next) => {
        let sessionId = generateSessionId()

        //Authenticate somehow
        let request = Promise.resolve()
           .then((response: any) => {

               //todo: Change later
               response = {
                   fullName: 'Jonathan Witchard',
                   DashboardApproval: true
               }


            //Check if successful
            if (false) {
                console.info(`Attempted auth for:\t${req.body.username}\n\tFailed:\t${response['ErrorMsg']}`)

                //Return unauthorized
                res.status(401).json({
                    message: 'Unauthorized access'
                })

                return
            }

            //Create data to be stored in token
            const payload = {
                fullName: response['fullName'],
                sessionId: sessionId,
                username: req.body.username,
                permissions: {
                    dashboard: response['DashboardApproval']
                }
            }

            //Create token with expiration date
            let token = jwt.sign(payload, serverConfig.signingKey, {
                expiresIn: serverConfig.tokenDuration
            })

            //Set the token in the cookie
            res.cookie(serverConfig.cookieName, token, {
                httpOnly: true
            })

            if (req.app.get('isDev') === true) {
                //Used to get access to the session id for dev purposes
                res.json({
                    fullName: payload.fullName,
                    permissions: payload.permissions,
                    sessionId: sessionId,
                })

                return
            }

            res.json({
                fullName: payload.fullName,
                permissions: payload.permissions
            })
        })
    }

    services() {
        return {
            'POST /auth': this.authenticate,
            'GET /logout': this.logout
        }
    }
}
