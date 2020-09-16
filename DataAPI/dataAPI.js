/* ACÁ SE OBTIENEN LOS DATOS DEL JSON DE LA PÁGINA
 * MINDICADOR.CL Y SE DEBEN PASAR AL FILESAPI
*/

function dataAPI() {

    const fetch = require('node-fetch');

    const status = response => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(new Error(response.statusText));
    };

    const obtenerJson = response => { return response.json(); }

    return fetch('https://mindicador.cl/api')
        .then(status)
        .then(obtenerJson)
        .catch(err => {
            console.log(err);
        })
}

module.exports = dataAPI;