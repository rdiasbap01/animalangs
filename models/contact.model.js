const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'], // Validación: nombre obligatorio
    minlength: [2, 'El nombre debe tener al menos 2 caracteres.'] // Validación: longitud mínima
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio.'], // Validación: email obligatorio
    match: [/^\S+@\S+\.\S+$/, 'El formato del correo no es válido.'] // Validación: formato correcto del email
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatorio.'], // Validación: mensaje obligatorio
    minlength: [10, 'El mensaje debe tener al menos 10 caracteres.'] // Validación: longitud mínima
  },
  fecha: {
    type: Date,
    default: Date.now // Fecha predeterminada
  }
});

module.exports = mongoose.model('Contact', contactSchema);
