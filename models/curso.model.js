const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  nivel: { // Nuevo campo para el nivel del curso
    type: String,
    required: true
  },
  enlace: { // Nuevo campo para el enlace del curso (por ejemplo, Udemy)
    type: String,
    required: false // Cambiar a false si no es obligatorio
  },
  imagen: { // Nuevo campo para almacenar la imagen del curso
    type: String,
    required: false // Cambiar a false si no es obligatorio
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Curso', cursoSchema);
