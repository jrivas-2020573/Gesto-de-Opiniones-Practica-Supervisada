/*
    Events Routes / Auth
    host + /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();


//Todas las peticiones usan el token
router.use(validarJWT);


//Obtener Eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post('/'
    , [ //Middlewares
        validarJWT,
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    ], crearEvento);

//Actualizar evento
router.put('/:id'
    , [ //Middlewares
        validarJWT,
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        
    ], actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;