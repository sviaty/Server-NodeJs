require('babel-register')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {display} = require('./modules/functions')
const conf = require('./config.json')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//const mysql = require('mysql')
const pmysql = require('promise-mysql')
pmysql.createConnection({
    host: conf.db.host,
    database: conf.db.database,
    user: conf.db.user,
    password: conf.db.password
}).then((db) => {
    console.log('database connected')

    let membersRouter = express.Router()
    app.use(conf.rootAPI+'members', membersRouter)
    let Membres = require('./classes/membres.class')(db, conf)

    membersRouter.route('/')
        .get(async (req, res) => {
            let membres = await Membres.getMembres()
            res.json(display(membres))
        })

        .post(async (req, res) => {
            let membre = await Membres.addMembre(req.body.nom, req.body.mail, req.body.pwd)
            res.json(display(membre))
        })

    membersRouter.route('/:id')
        .get(async (req, res) => {
            let membre = await Membres.getMembreById(req.params.id)
            res.json(display(membre))
        })

        .put(async (req, res) => {
            let membre = await Membres.setMembre(req.body.nom, req.body.mail, req.body.pwd, req.params.id)
            res.json(display(membre))
        })

        .delete(async (req, res) => {
            let membre = await Membres.delMembre(req.params.id)
            res.json(display(membre))
        })

    app.listen(conf.port, () => {
        console.log("started");
    })
}).catch((err) => {
    console.log('Error database no-connect')
    console.log(err.message)
})
