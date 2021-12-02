require('babel-register')

console.log('début')
/*
//Promise
getMember()
    .then(m => {
        console.log(m)
        return getArt(m)
}).then((a) => {
    console.log((a))
})

getMember()
    .then(m => {return getArt(m) })
    .then(a => console.log(a) )
    .catch(err => console.log(err.message))
*/


//Async & Await
async function viewArt(){
    try {
        let m = await getMember()
        let a = await getArt()
        console.log(a)
    } catch (err) {
        console.log(err)
    }
}

viewArt()


function getMember(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Member 1')
        }, 1500)
    })
}

function getArt(m){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([1,2,3])
            //reject(new Error('Error Art'))
        }, 1500)
    })
}

console.log('fin')