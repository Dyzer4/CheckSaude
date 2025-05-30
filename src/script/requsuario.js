const express = require('express');
const app = express();
const connection = require('./api'); // módulo que exporta a conexão com o banco
const cors = require('cors'); 

app.use(cors());
app.use(express.json());

app.get('/usuario', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            console.error('Erro na consulta:', err);
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
        res.json(results);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
