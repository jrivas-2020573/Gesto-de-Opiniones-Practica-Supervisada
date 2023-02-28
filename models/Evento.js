const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

   title: {
        type: String,
        required: true
   },
   notes: {
        type: String
   },
   start: {
        type: Date,
        required: true
   },
   end: {
        type: Date,
        required: true
   },//Usuario que define quien hizo la nota
   user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        
   }

});

//Dejar de ver el __v y el _id
EventoSchema.method('toJSON', function(){
     const { __v, _id, ...object} = this.toObject();
     object.id = _id;
     return object;
})


module.exports = model('Evento', EventoSchema);