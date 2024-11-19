const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para el artículo
const articuloSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio.'], // Validación: título obligatorio
    minlength: [5, 'El título debe tener al menos 5 caracteres.']
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio.'], // Validación: contenido obligatorio
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio.'], // Validación: autor obligatorio
  },
  fecha: {
    type: Date,
    default: Date.now // Asignar la fecha automáticamente
  }
});

// Exportar el modelo
module.exports = mongoose.model('Articulo', articuloSchema);
