const fs = require('fs').promises;

const ruta = path.join(__dirname, '../data/perfil.json');

const getPerfil = async (req, res) => {
  try {
    const data = await fs.readFile(ruta, 'utf-8');
    const perfil = JSON.parse(data);
    return res.status(200).json(perfil);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'No se pudo obtener el perfil' });
  }
};

const getPerfilById = async (req, res) => {
  try {
    const data = await fs.readFile(ruta, 'utf8');
    const perfiles = JSON.parse(data);
    const { id } = req.params;
    const perfilId = perfiles.find((p) => p.id === parseInt(id));
    if (!perfilId) {
      return res
        .status(404)
        .json({ error: `No existe el perfil con id ${id}` });
    }
    return res.status(200).json(perfilId);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: `No se pudo obtener el detalle del perfil con id ${id}` });
  }
};

module.exports = { getPerfil, getPerfilById };
