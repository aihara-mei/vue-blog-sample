const article = require('./article.js')
const tag = require('./tag.js')
const login = require('./login.js')

module.exports = (app) => {
    app.use(article)
    app.use(tag)
    app.use(login)
    app.use(tag)
}