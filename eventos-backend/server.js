const http = require('http');

let participantes = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Cadastrar participante
  if (req.method === 'POST' && req.url === '/participantes') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const dados = JSON.parse(body);
        const novoParticipante = { id: nextId++, ...dados };
        participantes.push(novoParticipante);
        console.log('Novo participante cadastrado:', novoParticipante);
        res.end(JSON.stringify(novoParticipante));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'JSON inválido' }));
      }
    });
  }

  // Listar participantes
  else if (req.method === 'GET' && req.url === '/participantes') {
    res.end(JSON.stringify(participantes));
  }

  // CORS (pré-requisição)
  else if (req.method === 'OPTIONS') {
    res.end();
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
