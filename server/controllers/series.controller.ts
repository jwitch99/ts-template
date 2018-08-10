import BaseRouter from './base.controller'

export default class SeriesController extends BaseRouter {
    name = SeriesController.name

    /**
     * Gets all series information for the dashboard
     * @param req
     * @param res
     * @param next
     */
    getDashboardSeries = (req, res, next) => {
        res.send({
            data: undefined
        })
    }

    services() {
        return {
            '/': this.getDashboardSeries
        }
    }
}
