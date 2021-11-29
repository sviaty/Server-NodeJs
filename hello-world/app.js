require('babel-register')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const {success, error} = require('./modules/functions')
const conf = require('./config.json')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let members = [{
        id: 1,
        name: 'sviatoslav'
        }, {
        id: 2,
        name: 'igor'
        }, {
        id: 3,
        name: 'bogdan'}]

let membersRouter = express.Router()
app.use(conf.rootAPI+'members', membersRouter)

membersRouter.route('/')
    .get((req, res) => {
        if(req.query.max != undefined){
            res.json(
                success(members.slice(0, req.query.max))
            )
        } else {
            res.json(members)
        }
    })

    .post((req, res) => {
        //res.send(req.body)
        if(req.body.name){
            let sameName = false;
            for(let i=0; i < members.length; i++){
                if(members[i].name == req.body.name){
                    sameName = true
                    break
                }
            }

            if(sameName){
                res.json(error('name already taken'))
            } else {
                let member = {
                    id: createId(),
                    name: req.body.name
                }
                members.push(member)
                res.json(success(member))
            }
        } else {
            res.json(error('no name value'))
        }
    })

membersRouter.route('/:id')
    .get((req, res) => {
        let index = getIndex(req.params.id)
        if(typeof(index) == 'string') {
            res.json(error(index))
        } else {
            res.send(success(members[index]))
        }
    })
    .put((req, res) => {
        let index = getIndex(req.params.id)
        if(typeof(index) == 'string') {
            res.json(error(index))
        } else {
            let sameName = false
            for (let i=0; i < members.length; i++){
                if(req.body.name == members[i].name && req.params.id != members[i].id){
                    sameName = true
                    break
                }
            }

            if(sameName){
                res.json(error('same name'))
            } else {
                members[index].name = req.body.name
                res.send(success(true))
            }

        }
    })

    .delete((req, res) => {
        let index = getIndex(req.params.id)
        if(typeof(index) == 'string') {
            res.json(error(index))
        } else {
            members.splice(index,1)
            res.json(success(members))
        }
    })


app.listen(conf.port, () => {
    console.log("started");
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
