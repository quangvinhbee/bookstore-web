const express = require('express')

const authRoute = require('./v1/auth.route')
const indexRoute = require('./v1/index.route')
const adminRoute = require('./v1/admin.route')
const { verifyTokenAdmin } = require('../controllers/auth.controller')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/api/v1/auth',
        route: authRoute,
    },
    {
        path: '/api/v1/admin',
        route: [verifyTokenAdmin, adminRoute],
    },
    {
        path: '/api/v1',
        route: indexRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
