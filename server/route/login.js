const express = require('express')
const router = express.Router()
const secretKey = '123456'
const jwt = require('jsonwebtoken')
const db = require('../database/database.js')
const sha1 = require('sha1')

const creatToken = (id, name) => {
    return jwt.sign({
        id: id,
        name: name
    }, secretKey, { expiresIn: '7d' })
}

router.post('/api/login', (req, res) => {
    db.User.findOne({name: req.body.name}, (err, doc) => {
        if (err) {
            console.log(err)
        } else if (doc){
            const salt = doc.salt
            if (doc.password === sha1(req.body.password  + salt)) {
                const token = creatToken(doc._id, doc.name)
                res.status(200).send({
                    id: doc._id,
                    name: doc.name,
                    token: token
                });
            } else {
                res.status(401).end()
            }
        }
    })
})

module.exports = router
