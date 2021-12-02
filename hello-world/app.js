require('babel-register')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const {success, error} = require('./modules/functions')
const conf = require('./config.json')

const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: ''
})

db.connect((err) => {
    if(err){
        console.log(err.message)
    } else {
        console.log('database connected')

        app.use(morgan('dev'))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))

        let members = [{
            id: 1,
            name: 'sviatoslav',
            mail: 'sviat@mail.com',
            pwd: 'test'
        }]

        let membersRouter = express.Router()
        app.use(conf.rootAPI+'members', membersRouter)

        membersRouter.route('/')
            .get((req, res) => {
                let sql = 'SELECT * FROM membre'
                db.query(sql,[],(err, result) => {
                    if(err){
                        console.log(err.message)
                        res.json(error(err.message))
                    } else {
                        let m = result
                        res.json(success(m))
                    }
                })
            })

        membersRouter.route('/')
            .post((req, res) => {
                if(req.body.nom){
                    let sql = 'INSERT INTO membre (nom, mail, pwd) VALUES (?,?,?)'
                    db.query(sql, [req.body.nom, req.body.mail, req.body.pwd], (err, result) => {
                        if(err) {
                            console.log(err.message)
                            res.json(error(err.message))
                        } else {
                            let m = result
                            console.log('Ajout de '+ req.body.nom+ 'dans la database')
                            res.json(success('Ajout de '+ req.body.nom + ' dans la database'))
                        }
                    })
                } else {
                    res.json(error('no name value'))
                }
            })

        membersRouter.route('/:id')
            .get((req, res) => {
                let index = parseInt(req.params.id)
                if(typeof(index) == 'string') {
                    res.json(error(index))
                } else {
                    let sql = 'SELECT * FROM membre WHERE id = ?'
                    db.query(sql,[req.params.id],(err, result) => {
                        if(err){
                            console.log(err.message)
                        } else {
                            let m = result
                            if(typeof m !== 'undefined' && m.length > 0){
                                res.json(success(m))
                            } else {
                                console.log('Id du membre est inconnu')
                                res.json(error('Id du membre est inconnu'))
                            }
                        }
                    })
                }
            })

            .put((req, res) => {
                let index = parseInt(req.params.id)
                if(typeof(index) == 'string') {
                    res.json(error(index))
                } else {
                    let sql = 'UPDATE membre SET nom = ?, mail = ?, pwd = ? WHERE id = ?'
                    db.query(sql, [req.body.nom, req.body.mail, req.body.pwd, req.params.id], (err, result) => {
                        if (err) {
                            console.log(err.message)
                            res.json(error(err.message))
                        } else {
                            let m = result
                            console.log('Modification de ' + req.body.nom + 'dans la database')
                            res.json(success('Modification de ' + req.body.nom + ' dans la database'))
                        }
                    })
                }
            })

            .delete((req, res) => {
                let index = parseInt(req.params.id)
                if(typeof(index) == 'string') {
                    res.json(error(index))
                } else {
                    let sql = 'DELETE FROM membre WHERE id = ?'
                    db.query(sql, [req.params.id], (err, result) => {
                        if (err) {
                            console.log(err.message)
                            res.json(error(err.message))
                        } else {
                            let m = result
                            console.log('Suppression de id ' + req.params.id + 'dans la database')
                            res.json(success('Suppression de id ' + req.params.id + ' dans la database'))
                        }
                    })
                }
            })

        app.listen(conf.port, () => {
            console.log("started");
        })

    }
})



function getIndex(id){
    for(let i=0; i < members.length; i++){
        if(members[i].id == id){
            return i
        }
    }
    return 'wrong id'
}

function createId() {
    return members[members.length-1].id +1
}
/*
app.use((req, res, next) => {
    console.log('url : '+ req.url)
    next()
})

app.get('/api', (req, res) => {
    res.send('Root api')
})

app.get('/api/v1', (req, res) => {
    res.send('Root api v1')
})

app.get('/api/v1/member/:id', (req, res) => {
    res.send(req.params);
})

app.listen(8080, () => {
    console.log("started");
})

const os = require('os');
const fs = require('fs');
const http = require('http');
const mod = require('./modules/module')

console.log('hello world');
console.log(os.arch())

fs.readFile('test.txt','utf-8', (err, data) => {
    if(err){
        console.log('error r: '+err);
    }
    if(data){
        console.log(data);
        if(data != 'hello world file'){
            fs.writeFile('test.txt','hello world file','utf-8', (err) =>{
                console.log('error w:'+err);
            })
        }
    }
}
);

// toute les requêtes du port 8080 entre dans cette fonction anonyme
http.createServer((req, resp) => {

    if(req.url == '/'){
        resp.writeHead(200, {
            'Content-Type':'text/html'
        })
        resp.write('Accueil \n');
        resp.end();
    } else if(req.url == '/test') {
        resp.writeHead(200, {'Content-Type':'text/html'})

        fs.readFile('test.txt','utf-8', (err, data) => {
            if (err) {
                resp.write('error read file: ' + err);
                resp.end();
            }
            if (data) {
                resp.write(data);
                resp.end();
            }
        });


    } else {
        resp.writeHead(404, {
            'Content-Type':'text/html'
        })
        resp.write('Erreur 404');
        resp.end();
    }
}).listen('8080');

mod.sayHello();
*/
