const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async( req = request, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const {uid} = jwt.verify(
            token,
            process.env.SECRET_JWT_SED
        );

        const usuario = await Usuario.findById(uid);

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la base de datos'
            });
        }

       req.usuario = uid; 
       next();

       
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


}


module.exports = {
    validarJWT
}