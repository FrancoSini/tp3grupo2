# TRABAJO PRÁCTICO N°3 (BACK-END):

## Digital Factory API

Este proyecto es el servidor (Back-end) de nuestra aplicación. Se encarga de guardar y ordenar los datos en archivos JSON (como si fuera una base de datos) y dejarlos listos para que la página web los pueda consultar y mostrar en tiempo real


## GRUPO N°2:
- Franco Sinigaglia
- Joaquin Pignotti
- Lucia Aguero
- Mateo Barrera
- Ricardo Herbas
- Ignacio Painenahuel Luna


## Tecnologías utilizadas: Node.js, Express, Cors, Dotenv y JavaScript

## Estructura del proyecto
 ```
/proyecto-backend
│
├── app.js
├── README.md
│
├── /data
│   ├── equipo.json
│   ├── login.json
│   ├── perfil.json
│   ├── servicios.json
│   └── serviciosDetalle.json
│
├── /models
│   └── server.js
│
├── /routes
│   ├── equipoRoutes.js
│   ├── loginRoutes.js
│   ├── perfilRoutes.js
│   └── serviciosRoutes.js
│
└── /controllers
├── equipoController.js
├── loginController.js
├── perfilController.js
└── serviciosController.js
 ```
## Lógica principal

El servidor arranca desde el archivo `app.js`, que enciende la estructura base programada en `server.js`. Usamos herramientas para permitir que la página web se conecte sin bloqueos de seguridad (`cors`) y para que el servidor entienda los datos que le enviamos. Cuando el usuario entra a una sección de la página, el sistema busca el archivo de rutas que corresponde y ejecuta una función que lee los archivos de texto `.json` de forma segura. Si todo está bien, envía los datos de vuelta a la página; si algo falla, responde con un mensaje de error para que la aplicación no se caiga.

---
## Metodología de trabajo con Git y GitHub

- **Rama main:** Es la rama principal. Solo tiene el código limpio, finalizado y que funciona correctamente 
- **Rama dev:** Es la rama de desarrollo. Acá fuimos uniendo los cambios de todos para probar que el servidor funcione bien antes de pasarlo a la rama principal.
- **Ramas individuales:** Cada integrante del grupo creó su propia rama con su nombre y apellido para trabajar en sus computadoras. Una vez que terminábamos una función, subíamos los cambios a GitHub y creábamos un **Pull Request** para pasar el código a `dev`.


## Estructura de los archivos JSON (Ejemplos)

Para simular nuestra base de datos, usamos archivos JSON individuales. Cada uno maneja su propia lista de elementos de forma ordenada:

### Ejemplo de `equipo.json`
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "descripcion": "Desarrollador Frontend",
    "img": "../assets/img/integrante1.jpg"
  }
]
```

### Ejemplo de `servicios.json`

```json
[
  {
    "id": 1,
    "img": "../assets/img/servicio-desarrollo.png",
    "precio": "$500.00",
    "desc": "Desarrollo de páginas web dinámicas y aplicaciones a medida."
  }
]

```

### Ejemplo de `serviciosDetalle.json`


```json
[
  {
    "id": 1,
    "nombre": "Desarrollo Web Premium",
    "detalle": "Incluye diseño de interfaz UX/UI personalizado, optimización SEO para motores de búsqueda y soporte técnico completo por 6 meses."
  }
]

```

### Ejemplo de `login.json`


```json
[
  {
    "id": 1,
    "usuario": "admin",
    "password": "123"
  }
]

```

### Ejemplo de `perfil.json`


```json
[
  {
    "id": 1,
    "saludo": "¡Hola de nuevo por acá!",
    "nombre": "Juan Pérez",
    "profesion": "Administrador de Sistemas"
  }
]

```


## Funcionalidades

 ```getEquipo() ```

Descripción: Lee el archivo de texto donde están los integrantes de la empresa y los envía listos para mostrar
```javascript
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
 ```
Usa una función para abrir el archivo equipo.json. Revisa que el archivo tenga información adentro y que no esté vacío. Si todo está correcto, manda la lista con un código de éxito (200). Si el archivo no se puede abrir o falla, avisa con un código de error (500).

 ```getEquipoById()  ```

Descripción: Busca a un solo integrante del equipo usando su número de documento o ID
 ``` javaScript
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
 ```
Parámetros: id (string): El número de ID que la página web manda en la URL.

Valor de retorno: Los datos del integrante encontrado.

Abre la lista de integrantes y usa el comando  ```.find() ``` para buscar cuál de todos tiene el mismo número de ID que pidió la página. Si no encuentra a nadie con ese número, responde diciendo que no existe (404). Si lo encuentra, muestra solo a esa persona

 ```login()  ```

Descripción: Revisa si el usuario y la contraseña que se escribieron en el formulario son correctos

 ```JavaScript
async function login(req, res) {
  const { usuario, password } = req.body

  try {
    const data = await fs.readFile(ruta, 'utf-8')
    const usuarios = JSON.parse(data)

    const user = usuarios.find(u => u.usuario === usuario)

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error en el login' })
  }
}
 ```
Recibe el usuario y la clave que la persona escribió. Abre la lista de usuarios guardados y primero busca si el nombre de usuario existe. Si existe, compara que la contraseña escrita sea idéntica a la guardada. Si todo coincide, le da permiso para ingresar (200)

 ```getPerfilById()  ```

Descripción: Trae los datos personales del usuario que inició sesión para armar su panel privado

 ```JavaScript
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
 ```
Parámetros: id (string): El número identificador del usuario que está navegando.

Valor de retorno: La información del perfil de ese usuario.

Lee el archivo donde están las tarjetas de perfil, toma el número de ID que tiene el usuario logueado y busca sus datos correspondientes. Si no encuentra la cuenta, devuelve un error avisando que ese perfil no existe en el sistema

 ```getServicios()  ```

Descripción: Lee y envía la lista completa de todos los servicios digitales que la empresa ofrece.

 ```JavaScript
const getServicios = async (req, res) => {
  try {
    const data = await fs.readFile('./data/servicios.json', 'utf-8');
    const servicios = JSON.parse(data);
    return res.status(200).json(servicios);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los servicios' });
  }
};
 ```
Va directo a la carpeta de datos, abre el archivo  ```servicios.json  ```que contiene los nombres, precios y fotos de lo que vende la empresa, transforma ese texto en un formato que la computadora entienda y se lo manda de inmediato a la pantalla del navegador

```Enrutador de Equipo (equipoRoutes.js) ```

Descripción: Define los caminos específicos (rutas) dentro de la sección de equipo y determina qué función del controlador debe responder a cada uno.
```javascript
const { Router } = require('express')
const { getEquipo, getEquipoById } = require('../controllers/equipoController')

const router = Router()

// Obtener todo el equipo
router.get('/', getEquipo)

// Obtener integrante por ID
router.get('/:id', getEquipoById)

module.exports = router
```
Crea un enrutador usando la herramienta ```Router()``` de Express. Primero, importa las funciones que traen los datos desde el controlador de equipo. Luego, configura dos accesos: cuando alguien entra a la raíz (/), se ejecuta getEquipo para mostrar a todos los integrantes; y cuando alguien agrega un número de ID en la URL (/:id), se activa``` getEquipoById ```para buscar y mostrar a ese integrante en específico.

```rutas() ```

Descripción: Configura y conecta las direcciones URL del servidor (endpoints) con sus respectivos archivos de rutas.
```javascript
rutas() {
    this.app.use('/servicios', require('./routes/serviciosRoutes'));
    this.app.use('/equipo', require('./routes/equipoRoutes'));
    this.app.use('/perfil', require('./routes/perfilRoutes'));
    this.app.use('/login', require('./routes/loginRoutes'));
}
```
Actúa como el organizador principal de los accesos del servidor. Usando el comando ```this.app.use()```, define los caminos o carpetas virtuales (como /servicios o /equipo) y les asigna mediante un ```require()``` el archivo interno que debe encargarse de procesar todo lo que pase en esa sección de la página web