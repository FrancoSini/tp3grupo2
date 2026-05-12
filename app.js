const Server = require('./models/server');

const servidor = new Server();
servidor.listen();
console.log(servidor, Server);
