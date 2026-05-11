const { Router } = require('express')

const {
  getEquipo,
  getEquipoById
} = require('../controllers/equipoController')

const router = Router()

// Obtener todo el equipo
router.get('/', getEquipo)

// Obtener integrante por ID
router.get('/:id', getEquipoById)

module.exports = router