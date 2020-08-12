var express = require('express')
var router = express.Router()
var db = require('../database/database.js')
const confirmToken = require('../middlewares/token.js')

router.post('/api/article', confirmToken, (req, res) => {
    const article = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        date: Date()
    };
    new db.Article(article).save()
    res.status(200).send('New article saved.')
})

router.get('/api/article/:aid', (req, res) => {
    db.Article.findOne({aid: req.params.aid}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(doc)
        }
    })
})

router.delete('/api/article/:aid', confirmToken, (req, res) => {
    db.Article.remove({aid: req.params.aid}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send('deleted' + data)
        }
    })
})

router.patch('/api/article/:aid', confirmToken, (req, res) => {
    const aid = req.params.aid
    const article = {
        title: req.body.title,
        tags: req.body.tags,
        date: Date(),
        content: req.body.content
    }
    db.Article.update({aid: aid}, article, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send('updated ' + data.title)
        }
    })
})

router.get('/api/articles', (req, res) => {
    const page = req.query.payload.page
    const value = req.query.payload.value
    const limit = req.query.payload.limit - 0 || 4
    const skip = limit * (page - 1)
    if (value && value !== 'all') {
        db.Article.find({tags: value}).sort({date: -1}).limit(limit).skip(skip).exec()
            .then((articles) => {
                res.send(articles)
        })
    } else {
        db.Article.find({}).sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
            res.send(articles)
        })
    }
})

module.exports = router