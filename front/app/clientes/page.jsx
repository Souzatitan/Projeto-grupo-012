'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/service/api';
import styles from '@/styles/Dashboard.module.css';

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState('');
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    endereco: '',
    pessoa_fisica: true
  });

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    } else {
      carregarClientes();
    }
  }, []);

  const carregarClientes = async () => {
    try {
      const res = await api.get('/api/clientes');
      setClientes(res.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setErro('Erro ao buscar clientes. Você está logado?');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovoCliente({
      ...novoCliente,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCriar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/clientes', novoCliente);
      setNovoCliente({ nome: '', endereco: '', pessoa_fisica: true });
      carregarClientes();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      setErro('Erro ao criar cliente');
    }
  };

  const handleExcluir = async (id) => {
    if (!confirm('Deseja realmente excluir este cliente?')) return;
    try {
      await api.delete(`/api/clientes/${id}`);
      carregarClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setErro('Erro ao excluir cliente');
    }
  };

  const iniciarEdicao = (id) => {
    setClientes(clientes.map(c =>
      c.id_cliente === id ? { ...c, editando: true, original: { ...c } } : c
    ));
  };

  const cancelarEdicao = (id) => {
    setClientes(clientes.map(c =>
      c.id_cliente === id ? { ...c.original, editando: false } : c
    ));
  };

  const atualizarCampo = (id, campo, valor) => {
    setClientes(clientes.map(c =>
      c.id_cliente === id ? { ...c, [campo]: valor } : c
    ));
  };

  const salvarEdicao = async (id) => {
    const cliente = clientes.find(c => c.id_cliente === id);
    try {
      await api.put(`/api/clientes/${id}`, {
        nome: cliente.nome,
        endereco: cliente.endereco,
        pessoa_fisica: cliente.pessoa_fisica
      });
      setClientes(clientes.map(c =>
        c.id_cliente === id ? { ...c, editando: false } : c
      ));
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
      setErro('Erro ao editar cliente');
    }
  };

  return (
    <div className={styles.dashboardContent}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Lista de Clientes</h2>
        <button 
          onClick={() => router.push('/dashboard')} 
          className={styles.submitButton}
          style={{ marginLeft: 'auto' }}
        >
          ← Voltar
        </button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <form onSubmit={handleCriar} style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Novo Cliente</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novoCliente.endereco}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />
        <label style={{ display: 'block', margin: '10px 0' }}>
          Pessoa Física:
          <input
            type="checkbox"
            name="pessoa_fisica"
            checked={novoCliente.pessoa_fisica}
            onChange={handleInputChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button type="submit" className={styles.submitButton}>Cadastrar</button>
      </form>

      {clientes.map(cliente => (
        <div
          key={cliente.id_cliente}
          style={{
            background: 'white',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {cliente.editando ? (
            <>
              <input
                type="text"
                value={cliente.nome}
                onChange={(e) => atualizarCampo(cliente.id_cliente, 'nome', e.target.value)}
                className={styles.inputField}
              />
              <input
                type="text"
                value={cliente.endereco}
                onChange={(e) => atualizarCampo(cliente.id_cliente, 'endereco', e.target.value)}
                className={styles.inputField}
              />
              <label>
                Pessoa Física:
                <input
                  type="checkbox"
                  checked={cliente.pessoa_fisica}
                  onChange={(e) => atualizarCampo(cliente.id_cliente, 'pessoa_fisica', e.target.checked)}
                  style={{ marginLeft: '10px' }}
                />
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => salvarEdicao(cliente.id_cliente)} className={styles.submitButton}>Salvar</button>
                <button onClick={() => cancelarEdicao(cliente.id_cliente)} className={styles.submitButton}>Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '1.05rem', color: '#5a4a42' }}>
                <strong>{cliente.nome}</strong> — {cliente.endereco} — Pessoa Física: {cliente.pessoa_fisica ? 'Sim' : 'Não'}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => iniciarEdicao(cliente.id_cliente)} className={styles.submitButton}>Editar</button>
                <button onClick={() => handleExcluir(cliente.id_cliente)} className={styles.submitButton}>Excluir</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}