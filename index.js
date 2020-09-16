const readline = require('readline');
const timestamp = require('time-stamp');
const color = require('colors');

var generarArchivo = require('./CrearArchivos/crear');
var leer = require('./Estadistica/estadisticas');

var lector = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log('=============================== MENÚ ==============================='.bold);
    console.log('¿Qué desea realizar?\n[1] Actualizar indicadores\n[2] Obtener promedios\n[3] Obtener valor actual\n[4] Mínimo histórico\n[5] Máximo histórico\n[0] Salir');
    lector.question('Escriba su opción:\n'.underline, opcion => {
        switch (opcion) {
            case '1':
                console.log(`Actualizando los valores a la fecha ${timestamp('DD-MM-YYYY')} a las ${timestamp('HH:mm:ss')}`.bgWhite.black.bold);
                console.log('Espere por favor ...'.yellow);
                generarArchivo.crearArchivo()
                    .then(data => {
                        console.log(data.green);
                        menu();
                    }, err => {
                        console.log(err.red);
                        menu();
                    });
                break;
            case '2':
                leer.leerArchivos()
                    .then(arregloContenido => {
                        //Recibe el arreglo con el contenido y se lo pasa a la función promedios
                        return leer.getPromedios(arregloContenido,lector);
                    })
                    .then(resolve => {
                        console.log(resolve.green); //este clg devuelve el resolve de getPromedios
                        menu();
                    })
                    .catch(error => {
                        console.log(error.red);
                        menu();
                    });
                break;
            case '3':
                console.log(`Valor actual a la fecha de ${timestamp('DD-MM-YYYY')} - ${timestamp('HH:mm')}`.bgWhite.black.bold);
                leer.leerArchivos()
                    .then(arregloContenido => {
                        return leer.getValorActual(arregloContenido);
                    })
                    .then(resp => {
                        console.log(resp.green);
                        menu();
                    });
                break;
            case '4':
                console.log(`Mínimo consultado el día ${timestamp('DD-MM-YYYY')} a las ${timestamp('HH:mm')}`.bgWhite.black.bold);
                leer.leerArchivos()
                    .then(arregloContenido => {
                        return leer.getMinimo(arregloContenido);
                    })
                    .then(res => {
                        console.log(res.green);
                        menu();
                    });
                break;
            case '5':
                console.log(`Máximo consultado el día ${timestamp('DD-MM-YYYY')} a las ${timestamp('HH:mm')}`.bgWhite.black.bold);
                leer.leerArchivos()
                    .then(arregloContenido => {
                        return leer.getMaximo(arregloContenido);
                    })
                    .then(res => {
                        console.log(res.green);
                        menu();
                    });
                break;
            case '0':
                console.log('¡Hasta luego!'.bgWhite.black.bold);
                lector.close();
                process.exit(0);
                break;
            default:
                console.log('Ingresa una opción correcta');
                menu();
                break;
        }
    })
}

menu();