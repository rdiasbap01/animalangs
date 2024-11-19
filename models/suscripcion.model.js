const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para la suscripción
const suscripcionSchema = new Schema({
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio.'],
      minlength: [2, 'El nombre debe tener al menos 2 caracteres.']
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio.'],
      unique: true, // Validación: email único
      match: [/^\S+@\S+\.\S+$/, 'El formato del correo no es válido.']
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Suscripcion', suscripcionSchema);
  