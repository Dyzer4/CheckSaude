const mysql = require('mysql2');
const fs = require('fs');

const config = {
  host: 'dbchecksaude.mysql.database.azure.com',
  user: 'diego',                          
  password: '',                         
  database: 'check_saude',                
  port: 3306,
  ssl: {
    ca: fs.readFileSync('/Users/2DT/Downloads/DigiCertGlobalRootCA.crt.pem')
  }
};

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
  console.log('Conexão estabelecida.');

});

module.exports = connection;
