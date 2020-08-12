const express = require('express')
const router = express.Router()
const db = require('../database/database.js')

router.get('/api/tags', (req, res) => {
    db.Article.find({}).distinct('tags', (err, doc) => {
        if (err) {
            console.log(err)
        } else if (doc) {
            res.send(doc)
        }
    })
})

module.exports = router
