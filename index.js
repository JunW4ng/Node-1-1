const argumentos = process.argv.slice(2)

let nombre = String(argumentos[0]);
let extension = String(argumentos[1]);
let indicador = String(argumentos[2]);
let cantidadPesos = Number(argumentos[3]);

let nombreArchivo = `${nombre}.${extension}`

let fecha = new Date();

const https = require('https')
const fs = require('fs')

https.get('https://mindicador.cl/api', (resp) => {

    resp.on('data', (data) => {
        const infoData = JSON.parse(data)

        let valorIndicador = infoData[indicador].valor

        //Convertidor pesos a lo indicado
        let totalConvertido = cantidadPesos / valorIndicador;

        const template =
            `
            A la fecha: ${fecha}
            Fue realizada cotizacion con los siguientes datos:
            Cantidad de pesos a convertir: ${cantidadPesos} pesos
            Convertido a ${indicador} da un total de:
            ${totalConvertido}
            `

        fs.writeFile(nombreArchivo, `${template}`, 'utf8', () => {
            console.log('Cotizacion realizada con exito')
            fs.readFile(nombreArchivo, 'utf8', (err, cotizacion) => {
                console.log(cotizacion)
            })
        })

    })

}).on('error', (err) => {
    console.log('Error: ' + err.message)
})


