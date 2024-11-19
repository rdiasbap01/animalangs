const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model'); // Importamos el modelo de usuario para verificar si es admin

const verificarToken = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    const verificado = jwt.verify(token, '06796719948');
    req.usuario = verificado;

    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findById(verificado.id);
    if (!usuario.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado. No tienes permisos de administrador.' });
    }

    next(); // Pasar al siguiente middleware o ruta si es admin
  } catch (error) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};

module.exports = verificarToken;
