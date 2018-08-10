import Server from './server'
import {getAppParser} from './util'
import chalk from 'chalk'

const args = getAppParser()

const server = new Server(args)

if (args.listRoutes) {
    server.listRoutes()
}

server.start()

process.on('SIGINT', () => {
    server.stop(() => {
            console.log(chalk.bgRed.white('Server terminated'))
            process.exit(0)
        }
    )
})



