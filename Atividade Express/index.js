const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');

// Rota inicial
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.json());

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Sabrinna' },
        { id: 2, name: 'Maria Lívia' }
    ]);
});

app.post('/api/users', (req, res) => {
    const user = req.body; // Obter dados enviados no corpo da requisição
    res.status(201).json(user); // Retornar o usuário criado
});

app.use(express.static('public'));

// Rotas de usuários
app.use('/api/users', usersRoutes);