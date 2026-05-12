const { Router } = require('express');
const { getPerfil, getPerfilById } = require('../controllers/perfilController');

const rutas = Router();

rutas.get('/', getPerfil);
rutas.get('/:id', getPerfilById);

module.exports = rutas;
