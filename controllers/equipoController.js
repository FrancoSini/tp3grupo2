const fs = require('fs').promises
const path = require('path')

const ruta = path.join(__dirname, '../data/equipo.json')

// Obtener todo el equipo
const getEquipo = async (req, res) => {

  try {

    const data = await fs.readFile(ruta, 'utf-8')

    const equipo = JSON.parse(data)

    if (!equipo || equipo.length === 0) {

      return res.status(404).json({
        msg: 'No se encontró el equipo'
      })
    }

    return res.status(200).json(equipo)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      msg: 'Error al leer el equipo'
    })
  }
}

// Obtener integrante por ID
const getEquipoById = async (req, res) => {

  try {

    const data = await fs.readFile(ruta, 'utf-8')

    const equipos = JSON.parse(data)

    const equipo = equipos.find(
      equipo => equipo.id === parseInt(req.params.id)
    )

    if (!equipo) {

      return res.status(404).json({
        msg: 'Equipo no encontrado'
      })
    }

    return res.status(200).json(equipo)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      msg: 'Error al leer el equipo'
    })
  }
}

module.exports = {
  getEquipo,
  getEquipoById
}