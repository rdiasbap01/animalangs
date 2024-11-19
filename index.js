const express = require('express');
const helmet = require('helmet');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Necesario para manejar cookies
const csrf = require('csurf'); // Agregar csurf
const authRoutes = require('./routes/auth');
const authAdminMiddleware = require('./middleware/auth'); // Middleware para verificar si es admin
const usuariosRoutes = require('./routes/usuarios'); // Importamos las rutas de usuarios
const cors = require('cors');
const config = require('./config');
const app = express();
const port = 4000;
const { body, validationResult } = require('express-validator'); // Importar express-validator

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/auth', authRoutes);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https://cdnjs.cloudflare.com"], // Limita a scripts específicos si es necesario
      "style-src": ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"], // Permitir CSS externo si es necesario
      "img-src": ["'self'", "data:"], // Limita los orígenes de imágenes
      "object-src": ["'none'"], // Bloquea plugins innecesarios
      "base-uri": ["'self'"],
      "form-action": ["'self'"] // Limita los destinos de envío de formularios
    }
  }
}));
app.use(cookieParser());

// Configuración de CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Conexión a MongoDB
mongoose.connect('mongodb+srv://animalangs:farbecor5@animalangs.bzxjd.mongodb.net/animalangs')
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('Error de conexión de Mongoose: ', err);
});

// Archivos estáticos
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
app.use('/iconos', express.static(path.join(__dirname, 'iconos')));
app.use('/blog', express.static(path.join(__dirname, 'blog')));

// Importar rutas
const indexRoutes = require('./routes/index');
const cursosRoutes = require('./routes/cursos');
const contactoRoutes = require('./routes/contacto');
const suscripcionRoutes = require('./routes/suscripciones');
const blogRoutes = require('./routes/blog');

// Usar las rutas
app.use('/', indexRoutes);
app.use('/cursos', cursosRoutes);
app.use('/contacto', contactoRoutes);
app.use('/suscripcion', suscripcionRoutes);
app.use('/blog', blogRoutes);
app.get('/admin', authAdminMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});
app.use('/usuarios', usuariosRoutes); // Conectar las rutas de usuarios

// Ruta para obtener token CSRF
app.get('/get-csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Ruta para manejar envíos de formularios con validación
app.post('/submit', [
  body('email').isEmail().normalizeEmail(), // Validar que el campo 'email' tenga formato de correo y normalizar
  body('username').isLength({ min: 5 }).trim().escape(), // Validar longitud mínima del 'username' y sanitizar
  body('mensaje').notEmpty().trim().escape() // Validar que el mensaje no esté vacío y sanitizar
], (req, res) => {
  const errors = validationResult(req); // Verificar si hay errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Retornar errores en formato JSON
  }

  // Proceder con la lógica si los datos son válidos
  res.json({ message: 'Datos validados correctamente.' }); // Devolver JSON con la respuesta
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
