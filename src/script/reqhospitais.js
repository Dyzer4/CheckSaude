const express = require('express');
const app = express();
const connection = require('./api');

app.use(express.json());

app.get('/hospitais', (req, res) => {
    connection.query('SELECT * FROM hospitais', (err, results) => {
        if (err) {
            console.error('Erro na consulta:', err);
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
        res.json(results);
    });
});

function hospitais() {
    fetch('http://localhost:3000/hospitais')
        .then(response => response.json())  // Converte a resposta para JSON
        .then(data => {
            console.log(data[3].nome_hospital);                // Manipula os dados recebidos
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });
}

hospitais()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
