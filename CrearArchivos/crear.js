/* 
ACÁ SE OBTIENEN LOS DATOS Y SE CREAN LOS JSON
*/
var getData = require('../DataAPI/dataAPI.js');
const fs = require('fs');
const timestamp = require('time-stamp');

function crearArchivo() {
    let fecha = Date.now();
    let fc = timestamp('DD-MM-YYYY');
    let hc = timestamp('HH:mm:ss');

    return new Promise( (resolve,reject) => {
        getData().then(function (datos) {
            if(datos == undefined){
                return reject('¡¡ERROR en el servidor de mindicador.cl!! ');
            }

            //Crear un json para filtrar los datos obtenidos
            let datosMindicador = {
                fechaCreacionArchivo: fc,
                horaCreacionArchivo: hc,
                valorDolar: datos.dolar.valor,
                fechaDolar: datos.dolar.fecha,
                valorEuro: datos.euro.valor,
                fechaEuro: datos.euro.fecha,
                valorTasaDesempleo: datos.tasa_desempleo.valor,
                fechaTasaDesempleo: datos.tasa_desempleo.fecha
            }

            //Crear archivo
            fs.writeFileSync("./datos/mindicador_"+fecha+".ind",JSON.stringify(datosMindicador));
            resolve('Se ha creado el archivo exitósamente');

        })
    })
}

module.exports = { crearArchivo };
