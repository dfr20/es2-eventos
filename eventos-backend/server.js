const http = require('http');

let participantes = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Listar participantes
  if (req.method === 'GET' && req.url === '/participantes') {
    res.end(JSON.stringify(participantes));
  }
  
  // Cadastrar participante
  else if (req.method === 'POST' && req.url === '/participantes') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const dados = JSON.parse(body);
      const novoParticipante = {
        id: nextId++,
        ...dados
      };
      participantes.push(novoParticipante);
      res.end(JSON.stringify(novoParticipante));
    });
  }
  
  // Deletar participante
  else if (req.method === 'DELETE' && req.url.startsWith('/participantes/')) {
    const id = parseInt(req.url.split('/')[2]);
    participantes = participantes.filter(p => p.id !== id);
    res.end(JSON.stringify({ success: true }));
  }
  
  else if (req.method === 'OPTIONS') {
    res.end();
  }
  
  else {
    res.statusCode = 404;
    res.end('Não encontrado');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});