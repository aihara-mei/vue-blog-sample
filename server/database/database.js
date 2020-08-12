var mongoose = require('mongoose')
var Schema = mongoose.Schema
const sha1 = require('sha1')
const rand = require('csprng')
const data = require('./origin_data')
const Sequence = require('./sequence')

const UserSchema = new Schema(
    {
        name:String,
        password:String,
        salt: String
    },
    { versionKey: false}
)

const ArticleSchema = new Schema(
    {
        aid: { type: Number, index: { unique: true}},
        title: String,
        content: String,
        tags: [String],
        date: Date
    },
    {versionKey: false}
)

ArticleSchema.pre('save', function (next) {
    var self = this
    if(self.isNew){
        Sequence.increment('Article', function (err, result) {
            if (err) { throw err }
            self.aid = result.value.next
            console.log('saved article aid:' + self.aid)
            next()
        })
    } else {
        next()
    }
})

const Models = {
    User: mongoose.model('User', UserSchema),
    Article: mongoose.model('Article', ArticleSchema),
}

const initialize = function () {
    console.log('Initializing data...')
    // Sequence.find({}).exec().then((sequence) => console.log(sequence))
    Models.User.find({}, (err, doc) => {
        if (err){
            console.log(err)
            console.log('initalization fails.')
        } else if (!doc.length) {
            const salt = rand()
            new Models['User']({name: 'root', password: sha1('123456' + salt), salt: salt}).save()
            new Sequence({_id: 'Article', next: 0}).save()
            Promise.all(data.map((item) => { new Models['Article'](item).save() }))
                .then(() => { console.log('initialize successfully') })
                .catch(() => { console.log('initialize failed')} )
        } else {
            console.log('initialize sucessfully')
        }
    })
}

mongoose.connect('mongodb://127.0.0.1/vue-blog')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Database connection error.'))
db.on('error', function (error) { console.error.bind(console, 'Database connection error.' + error); })
  
db.once('open', function () { 
    console.log('The database is connected.')
    initialize()
});

db.on('openUri', function () { console.log('Connection success.') })
db.on('disconnected', function () { console.log('The database is disconnected.') })

module.exports = Models