const express = require('express');
const session = require('express-session');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const tipoServicoRoutes = require('./routes/tipoServicoRoutes');
const tipoServicoRealizadoRoutes = require('./routes/tipoServicoRealizadoRoutes');
const sequelize = require('./config/database');
const Administrador = require('./models/Administrador');
const isAuthenticated = require('./middlewares/isAuthenticated');

const app = express();

// Middleware CORS (permite acesso do frontend React)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Sessão
app.use(session({
  secret: 'chave_super_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hora
    httpOnly: true
  }
}));



// Rota de login com verificação no banco de dados
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const admin = await Administrador.findOne({ where: { email, senha } });

    if (!admin) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    req.session.admin = true;
    res.json({ mensagem: 'Login realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro no login', erro: error.message });
  }
});

// Rota de logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao sair' });
    res.clearCookie('connect.sid');
    res.json({ mensagem: 'Logout efetuado com sucesso' });
  });
});

// Rotas protegidas
app.use('/api/clientes', isAuthenticated, clienteRoutes);
app.use('/api/tipo_servico', isAuthenticated,tipoServicoRoutes);
app.use('/api/tipo_servico_realizado', tipoServicoRealizadoRoutes);


// Inicia servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(3001, () => {
      console.log('Servidor backend rodando na porta 3001');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco:', err);
  });
