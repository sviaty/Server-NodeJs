let conf,db

module.exports = (_db, _conf) => {
    db = _db
    conf = _conf
    return Membres
}

let Membres = class {

    // Ajouter un membre
    static addMembre(nom,mail,pwd){
        return new Promise((next) => {
            let sql = 'INSERT INTO membre (nom, mail, pwd) VALUES (?,?,?)'
            db.query(sql, [nom, mail, pwd])
                .then((result) => {
                    console.log(result)
                    next('Ajout du membre')
                })
                .catch((err) => {
                    next(err)
                })
        })
    }

    // Modifier un membre
    static setMembre(nom,mail,pwd,id){
        return new Promise((next) => {
            let sql = 'UPDATE membre SET nom = ?, mail = ?, pwd = ? WHERE id = ?'
            db.query(sql, [nom, mail, pwd, id])
                .then((result) => {
                    console.log(result)
                    next('Modification du membre')
                })
                .catch((err) => {
                    next(err)
                })
        })
    }

    // Supprimer un membre
    static delMembre(id){
        return new Promise((next) => {
            let sql = 'DELETE FROM membre WHERE id = ?'
            db.query(sql, [id])
                .then((result) => {
                    console.log(result)
                    next('Suppression du membre')
                })
                .catch((err) => {
                    next(err)
                })
        })
    }

    // Retourne tous les membres
    static getMembres(){
        return new Promise((next) => {
            let sql = 'SELECT * FROM membre'
            db.query(sql,[])
                .then((result) => {
                    let r = result
                    if(typeof r !== 'undefined'){
                        next(r)
                    } else {
                        next(new Error('wrong id'))
                    }
                })
                .catch((err) => {
                    next(err)
                })
        })
    }

    // Retourne un membre avec son Id
    static getMembreById(id){
        return new Promise((next) => {
            let sql = 'SELECT * FROM membre WHERE id = ?'
            db.query(sql,[id])
                .then((result) => {
                    let r = result[0]
                    if(typeof r !== 'undefined'){
                        next(r)
                    } else {
                        next(new Error('wrong id'))
                    }
                })
                .catch((err) => {
                    next(err)
                })
        })
    }
}