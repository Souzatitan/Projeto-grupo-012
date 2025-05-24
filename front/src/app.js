import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // URL do seu backend
    axios.get('http://localhost:3001/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend React</h1>
      {data && <p>Mensagem do backend: {data.message}</p>}
    </div>
  );
}



// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [backendStatus, setBackendStatus] = useState('Testando conexão...');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get('/api/status');
        setBackendStatus(`✅ Backend OK: ${response.data.status}`);
        console.log('Resposta completa:', response.data);
      } catch (error) {
        setBackendStatus(`❌ Falha: ${error.message}`);
      }
    };
    checkBackend();
  }, []);

  return (
    <div>
      <h1>Status da Conexão</h1>
      <p>{backendStatus}</p>
    </div>
  );
}

export default App;