const express = require('express')

const router = express.Router()

router.get('/test', (req, res) => {
    const { token } = req.headers
    res.status(200).send({
        name: 'admin',
        role: 'ADMIN',
    })
})

module.exports = router
