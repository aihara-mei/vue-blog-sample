const jwt = require('jsonwebtoken')
const secretKey = '123456'

const confirmToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).end('no token')
    } else {
        const token = req.headers.authorization
        jwt.verify(token, secretKey, function (err) {
            if (err) {
                res.status(401).end(err.message)
            }
        })
    }
    next()
}
module.exports = confirmToken