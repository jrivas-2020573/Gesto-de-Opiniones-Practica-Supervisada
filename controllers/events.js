const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
    .populate('user', 'name');

    res.json({
        ok: true,
        msg: eventos
    })

}


// const crearEvento = async (req, res = response) => { 

//     const { user, ...body} = req.body;
    
//     try {
//         let eventoEnDB = await Evento.findOne({title: body.title});
        
//         if (eventoEnDB) {
//             return res.status(400).json({
//                 msg: `El evento ${eventoEnDB.title} ya esta en la DB`
//             });
//         }
        
//         const data = {
//             ...body,
//             user: req.uid._id
//         }
        
//         const evento = new Evento(data);
//         //Mandamos el usuario que graba la nota
//         evento.user = req.uid;
        
//         await evento.save();
        
//         res.json({
//             ok: true,
//             evento
//         })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'hable con el admin'
//         })
//     }

// }


const crearEvento = async (req, res = response) => {
    
    const evento = new Evento(req.body);

    try {
        //Mandamos el usuario que graba la nota
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok:true,
            eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el admin'
        })
    }

}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por el id'
            });
        }

        if (evento.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin'
        });
    }

}


const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evemto no existe por el id'
            })
        }

        if (evento.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);
        
        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin'
        })
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
