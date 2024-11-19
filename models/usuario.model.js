const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importar bcrypt para encriptar contraseñas

const Schema = mongoose.Schema;

// Definir el esquema para el usuario
const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    minlength: [3, 'El nombre debe tener al menos 3 caracteres.']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio.'],
    unique: true, // Validar que el correo sea único
    match: [/^\S+@\S+\.\S+$/, 'El formato del correo no es válido.']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres.']
  },
  isAdmin: { // Nuevo campo para indicar si el usuario es administrador
    type: Boolean,
    default: false
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

// Encriptar la contraseña antes de guardarla en la base de datos
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = function (passwordIngresada) {
  return bcrypt.compare(passwordIngresada, this.password);
};

// Exportar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
