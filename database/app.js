require('babel-register')
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

        db.query('SELECT * FROM membre', (err, result) => {
            if(err){
                console.log(err.message)
            } else {
                console.log(result)
            }
        })

    }
})


