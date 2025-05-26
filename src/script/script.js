const mysql = require('mysql2');
const fs = require('fs');

// Configuração da conexão com o banco de dados MySQL no Azure
const config = {
  host: 'dbchecksaude.mysql.database.azure.com', // substitua pelo seu servidor
  user: 'diego',                           // substitua pelo seu usuário admin
  password: 'Senai@2025',                         // substitua pela sua senha
  database: 'check_saude',                // substitua pelo nome do banco
  port: 3306,
  ssl: {
    ca: fs.readFileSync('/Users/2DT/Downloads/DigiCertGlobalRootCA.crt.pem')
  }
};



// Cria a conexão
const connection = mysql.createConnection(config);

// Conecta e executa a consulta
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
  console.log('Conexão estabelecida.');

  // Consulta para buscar dados
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return;
    }
    console.log('Resultados da consulta:', results);

    // Encerra a conexão
    connection.end(endErr => {
      if (endErr) console.error('Erro ao fechar conexão:', endErr);
      else console.log('Conexão encerrada.');
    });
  });
});
