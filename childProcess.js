const child_process = require('child_process')

const ejecutar = () => {
    return new Promise((resolve) => {
        child_process.exec(`node index.js cot01 txt dolar 10000`, (err, result) => {
            resolve(result)
        })
    })
}

ejecutar().then(data => console.log(data))