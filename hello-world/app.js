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

