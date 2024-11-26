const express = require('express');
const cors = require('cors');
const multer = require('multer');

const sqlite3 = require('sqlite3').verbose(); // Importa o sqlite3
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('./receitas_la_web.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Rota para criar usuário
app.post('/usuarios', (req, res) => {
  const { username, email, senha } = req.body;

  // Verifica se todos os dados foram passados
  if (!username || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  // Comando SQL para inserir o usuário
  const sql = `INSERT INTO Usuarios (username, email, senha) VALUES (?, ?, ?)`;

  // Executa o comando SQL
  db.run(sql, [username, email, senha], function (err) {
    if (err) {
      console.error('Erro ao inserir usuário:', err.message);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }

    // Retorna o ID do novo usuário criado
    res.status(201).json({ message: 'Usuário criado com sucesso!', id: this.lastID });
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post('/login', (req, res) => {
  const { username, email, senha } = req.body;  // Recebe dados do formulário de login

  if (!username && !email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  // Determina se estamos buscando por username ou email
  const query = username 
    ? `SELECT * FROM Usuarios WHERE username = ? AND senha = ?`
    : `SELECT * FROM Usuarios WHERE email = ? AND senha = ?`;

  // Executa a consulta SQL
  db.get(query, [username || email, senha], (err, row) => {
    if (err) {
      console.error('Erro ao verificar login:', err.message);
      return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }

    // Se o usuário não for encontrado
    if (!row) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Se o login foi bem-sucedido, você pode enviar uma resposta de sucesso
    return res.status(200).json({ message: 'Login bem-sucedido!', user: row });
  });
});


// Rota para inserir uma nova receita
app.post('/receitas', upload.single('capaReceita'), (req, res) => {
  const capaReceita = req.file?.buffer; // Buffer da imagem
  const { nomeReceita, ingredienteReceita, etapasReceita, tempoPreparo, tipoReceita, tematica } = req.body;

  // Verificar se todos os campos obrigatórios foram preenchidos
  if (!capaReceita || !nomeReceita || !ingredienteReceita || !etapasReceita || !tempoPreparo) {
      return res.status(400).send({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  // Inserir a receita no banco de dados
  const query = `
      INSERT INTO Receita (capa, nome, ingredientes, etapas, tempoPreparo, tematica, tema)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
      query,
      [
          capaReceita,
          nomeReceita,
          ingredienteReceita,
          etapasReceita,
          tempoPreparo,
          tematica === 'true' ? 'Sim' : 'Não',
          tipoReceita,
      ],
      function (err) {
          if (err) {
              console.error('Erro ao salvar a receita:', err);
              return res.status(500).send({ message: 'Erro ao salvar a receita.', error: err });
          }
          res.status(200).send({ message: 'Receita cadastrada com sucesso!', id_receita: this.lastID });
      }
  );
});

// Rota para buscar todas as receitas

//ver usuarios do admin
app.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM Usuarios';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err.message);
      res.status(500).send('Erro ao buscar usuários.');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Rota para deletar um usuário pelo ID
app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM Usuarios WHERE id_usuario = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar usuário:', err.message);
      return res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Exclusão bem-sucedida
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  });
});

// Rota para obter receitas por tema
app.get('/api/receitas', (req, res) => {
  const tema = req.query.tema; // Pega o tema da query string
  const sql = tema
    ? 'SELECT * FROM Receita WHERE tema = ?'
    : 'SELECT * FROM Receita'; // Se não passar tema, retorna todas

  db.all(sql, [tema], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar a tabela Receita:', err.message);
      return res.status(500).json({ message: 'Erro ao acessar as receitas' });
    }

    // Retorna as receitas como um array JSON
    res.json(rows);
  });
});
