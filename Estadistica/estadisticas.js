const fs = require('fs');
/*Esta función recorre todos los archivos que se encuentran en la carpeta datos
y los almacena en un arreglo llamado arregloContenido*/
function leerArchivos() {
    directorio = '/Users/camip/Documents/GitLab/indicadores_camila_pinto/datos/';
    var arregloContenido = [];

    return new Promise((resolve, reject) => {
        fs.readdir(directorio, (err, archivos) => {
            if (err)
                return reject(err);
            archivos.forEach(indicadores => {
                let data = JSON.parse(fs.readFileSync('./datos/' + indicadores, 'utf-8'));
                arregloContenido.unshift(data);
            });
            resolve(arregloContenido);
        });
    })
}

/*Esta función recibe como parámetro el arregloContenido de la función anterior
la cual contiene todos los datos de todos los archivos, para poder realizar los cálculos*/
function getPromedios(arreglo, lector) {
    var arrDolar = []; //almacena todos los valores del dolar
    var arrEuro = []; //almacena todos los valores del euro
    var arrTasa = []; //almacena todos los valores de la tasa de desempleo
    var fechas = [];
    var ultimaFecha = ' ';
    var primeraFecha = '99-99-9999';

    return new Promise((resolve, reject) => {
       
        //recorre el arreglo y almacenar los datos en los respectivos arreglos
        for (let i = 0; i < arreglo.length; i++) {
            fechas.push(arreglo[i].fechaCreacionArchivo);
            arrDolar.push(arreglo[i].valorDolar);
            arrEuro.push(arreglo[i].valorEuro);
            arrTasa.push(arreglo[i].valorTasaDesempleo);
        }

        //obtener la fecha más actual de todos los archivos
        for (var i = 0; i < fechas.length; i++) {
            if (ultimaFecha < fechas[i])
                ultimaFecha = fechas[i];
        }

        //obtener la fecha más antigua de todos los archivos
        for (var i = 0; i < fechas.length; i++) {
            if (primeraFecha > fechas[i])
                primeraFecha = fechas[i];
        }

        console.log('----------- INDICADORES -----------'.bold);
        console.log('(1) Dólar\n(2) Euro\n(3) Tasa de desempleo');
        lector.question('Ingrese el indicador a consultar:\n', indicador => {
            switch (indicador) {
                case '1':
                    let sumaDolares = arrDolar.reduce((total, numero) => total + numero, 0);
                    let promedioDolar = sumaDolares / arreglo.length;
                    resolve(`Rango de fechas de ${primeraFecha} hasta ${ultimaFecha}\nPromedio del dólar: $${promedioDolar.toPrecision(5)}`);
                    break;
                case '2':
                    let sumaEuros = arrEuro.reduce((total, numero) => total + numero, 0);
                    let promedioEuro = sumaEuros / arreglo.length;
                    resolve(`Rango de fechas de ${primeraFecha} hasta ${ultimaFecha}\nPromedio del euro: $${promedioEuro.toPrecision(5)}`);
                    break;
                case '3':
                    let sumaTasas = arrTasa.reduce((total, numero) => total + numero, 0);
                    let promedioTasas = sumaTasas / arreglo.length;
                    resolve(`Rango de fechas de ${primeraFecha} hasta ${ultimaFecha}\nPromedio tasa de desempleo: ${promedioTasas.toPrecision(4)}%`);
                    break;
                default:
                    reject('Ingrese una opción correcta');
                    break;
            }
        });
        // resolve(`Promedio del dólar: ${promedioDolar}\nPromedio del euro: ${promedioEuro}\nPromedio tasa de desempleo: ${promedioTasas}`);
    });
}

/*Esta función recibe como parámetro el arregloContenido de la función leerArchivos
la cual contiene los datos de todos los archivos para realizar los cálculos*/
function getMinimo(arreglo) {
    var fechaDolar;
    var fechaEuro;
    var fechaTasa;
    var fechas = [];
    var ultimaFecha = ' ';
    var primeraFecha = '99-99-9999';

    return new Promise((resolve, reject) => {
        if (!arreglo) {
            return reject('El arreglo no se ha recibido');
        }

        //obtener el minimo del dolar con un operador condicional ternario
        let minDolar = arreglo.reduce((min, p) => p.valorDolar < min ? p.valorDolar : min, arreglo[0].valorDolar, arreglo[0].fecha);
        for (var i = 0; i < arreglo.length; i++) {
            fechas.push(arreglo[i].fechaCreacionArchivo);
            if (minDolar == arreglo[i].valorDolar)
                fechaDolar = arreglo[i].fechaDolar;
        }

        //obtener el minimo del euro
        let minEuro = arreglo.reduce((min, p) => p.valorEuro < min ? p.valorEuro : min, arreglo[0].valorEuro);
        for (var i = 0; i < arreglo.length; i++) {
            if (minEuro == arreglo[i].valorEuro)
                fechaEuro = arreglo[i].fechaEuro;
        }

        //obtener el minimo de la tasa de desempleo
        let minTasa = arreglo.reduce((min, p) => p.valorTasaDesempleo < min ? p.valorTasaDesempleo : min, arreglo[0].valorTasaDesempleo);
        for (var i = 0; i < arreglo.length; i++) {
            if (minTasa == arreglo[i].valorTasaDesempleo)
                fechaTasa = arreglo[i].fechaTasaDesempleo;
        }

        //obtener la fecha más actual de todos los archivos
        for (var i = 0; i < fechas.length; i++) {
            if (ultimaFecha < fechas[i])
                ultimaFecha = fechas[i];
        }

        //obtener la fecha más antigua de todos los archivos
        for (var i = 0; i < fechas.length; i++) {
            if (primeraFecha > fechas[i])
                primeraFecha = fechas[i];
        }
        resolve(`Rango: ${primeraFecha} a ${ultimaFecha}\nDólar a: $${minDolar.toPrecision(5)} el ${fechaDolar.split('T',1)}\nEuro a: $${minEuro.toPrecision(5)} el ${fechaEuro.split('T',1)}\nTasa de desempleo a: ${minTasa.toPrecision(4)}% el ${fechaTasa.split('T',1)}`);
    })
}

/*Esta función recibe como parámetro el arregloContenido de la función leerArchivos
la cual contiene los datos de todos los archivos para realizar los cálculos*/
function getMaximo(arreglo) {
    var fechaDolar;
    var fechaEuro;
    var fechaTasa;
    var fechas = [];
    var ultimaFecha = ' ';
    var primeraFecha = '99-99-9999';

    return new Promise((resolve, reject) => {
        if (!arreglo) {
            return reject('El arreglo no se ha recibido');
        }

        //obtener el máximo del dolar
        let maxDolar = arreglo.reduce((max, p) => p.valorDolar > max ? p.valorDolar : max, arreglo[0].valorDolar);
        for (var i = 0; i < arreglo.length; i++) {
            fechas.push(arreglo[i].fechaCreacionArchivo);
            if (maxDolar == arreglo[i].valorDolar)
                fechaDolar = arreglo[i].fechaDolar;
        }

        //obtener el máximo del euro
        let maxEuro = arreglo.reduce((max, p) => p.valorEuro > max ? p.valorEuro : max, arreglo[0].valorEuro);
        for (var i = 0; i < arreglo.length; i++) {
            if (maxEuro == arreglo[i].valorEuro)
                fechaEuro = arreglo[i].fechaEuro;
        }

        //obtener el máximo de la tasa de desempleo
        let maxTasa = arreglo.reduce((max, p) => p.valorTasaDesempleo > max ? p.valorTasaDesempleo : max, arreglo[0].valorTasaDesempleo);
        for (var i = 0; i < arreglo.length; i++) {
            if (maxTasa == arreglo[i].valorTasaDesempleo)
                fechaTasa = arreglo[i].fechaTasaDesempleo;
        }

        //obtener la fecha más actual de todos los archivos
        for (var i = 0; i < fechas.length; i++) {
            if (ultimaFecha < fechas[i])
                ultimaFecha = fechas[i];
        }

        //obtener la fecha más antigua de todos los archivos
        for (var i = 0; i < fechas.length; i++) {
            if (primeraFecha > fechas[i])
                primeraFecha = fechas[i];
        }

        resolve(`Rango: ${primeraFecha} a ${ultimaFecha}\nDólar a: $${maxDolar.toPrecision(5)} el ${fechaDolar.split('T',1)}\nEuro a: $${maxEuro.toPrecision(5)} el ${fechaEuro.split('T',1)}\nTasa de desempleo a: ${maxTasa.toPrecision(4)}% el ${fechaTasa.split('T',1)}`);
    })
}

function getValorActual(arreglo) {
    var valorDolar;
    var valorEuro;
    var valorTasa;
    var ultimaFecha = ' ';
    var hora;

    return new Promise((resolve, reject) => {
        if (!arreglo) {
            return reject('El arreglo no se ha recibido');
        }

        //obtener la fecha más actual de todos los archivos
        for (var i = 0; i < arreglo.length; i++) {
            if (ultimaFecha < arreglo[i].fechaCreacionArchivo) {
                ultimaFecha = arreglo[i].fechaCreacionArchivo;
                hora = arreglo[i].horaCreacionArchivo;
            }
        }

        //obtener dolar del último archivo
        for (var i = 0; i < arreglo.length; i++) {
            if (arreglo[i].fechaCreacionArchivo == ultimaFecha)
                valorDolar = arreglo[i].valorDolar;
        }

        //obtener euro del último archivo
        for (var i = 0; i < arreglo.length; i++) {
            if (arreglo[i].fechaCreacionArchivo == ultimaFecha)
                valorEuro = arreglo[i].valorEuro;
        }

        //obtener tasa desempleo del último archivo
        for (var i = 0; i < arreglo.length; i++) {
            if (arreglo[i].fechaCreacionArchivo == ultimaFecha)
                valorTasa = arreglo[i].valorTasaDesempleo;
        }
        resolve(`Fecha del último archivo almacenado: ${ultimaFecha} a las ${hora}\nValor dólar: $${valorDolar.toPrecision(5)}\nValor euro: $${valorEuro.toPrecision(5)}\nValor tasa de desempleo: ${valorTasa.toPrecision(4)}%`);
    })
}

module.exports = { leerArchivos, getPromedios, getMinimo, getMaximo, getValorActual };