const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const morgan = require('morgan')
const xss = require('xss-clean')
const routeConfig = require('../apis/routes')
const config = require('config')
const next = require('next')
const rateLimit = require('express-rate-limit')
const fs = require('fs')
const https = require('https')
require('dotenv').config()

module.exports = () => {
    const app = express()

    // set log request
    app.use(morgan('dev'))

    // set security HTTP headers
    // app.use(helmet.contentSecurityPolicy())
    app.use(helmet.dnsPrefetchControl())
    app.use(helmet.expectCt())
    app.use(helmet.frameguard())
    app.use(helmet.hidePoweredBy())
    app.use(helmet.hsts())
    app.use(helmet.ieNoOpen())
    app.use(helmet.noSniff())
    app.use(helmet.permittedCrossDomainPolicies())
    app.use(helmet.referrerPolicy())
    app.use(helmet.xssFilter())

    // parse json request body
    app.use(express.json())

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }))

    // sanitize request data
    app.use(xss())
    app.use(mongoSanitize())

    // gzip compression
    app.use(compression())

    // set cors blocked resources
    app.use(cors())
    app.options('*', cors())

    // set rate limit request
    const createAccountLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 50, // start blocking after 5 requests
        message: 'Too many accounts created from this IP, please try again after an hour',
    })
    app.use('/', createAccountLimiter)

    // set http ssl
    const key = fs.readFileSync('./privkey.pem')
    const cert = fs.readFileSync('./certificate.crt')
    const server = https.createServer({ key: key, cert: cert }, app)

    // setup nextjs
    if (config.get('next.enable')) {
        const nextApp = next({ dev: config.get('next.devMode'), dir: './next' })
        const handle = nextApp.getRequestHandler()
        nextApp
            .prepare()
            .then(() => {
                console.log('Next App Initialized!')
                app.get('*', (req, res) => handle(req, res))
            })
            .catch((err) => {
                console.log('Start Frontend Error', err)
            })
    }

    // api routes
    app.use('/', routeConfig)

    // // convert error to ApiError, if needed
    // app.use(errorConverter)

    // // handle error
    // app.use(errorHandler)

    app.listen(config.get('port'))
    // server.listen(3333, () => {
    //     console.log('listening on 3001')
    // })

    return app
}
