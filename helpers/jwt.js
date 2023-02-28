const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET_JWT_SED, {
            expiresIn: '2h'
        }, (err, token) => {

            if( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
            
        });

    });

}

module.exports = {
    generarJWT
}