const fs = require('fs').promises


const path = require('path')

const ruta = path.join(__dirname, '../data/login.json')

async function login(req, res) {
  const { usuario, password } = req.body

  try {
    // leer usuarios desde login.json
    const data = await fs.readFile(ruta, 'utf-8')
    const usuarios = JSON.parse(data)

    // buscar usuario
    const user = usuarios.find(u => u.usuario === usuario)

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    // comparar contraseña en texto plano
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error en el login' })
  }
}

module.exports = { login }