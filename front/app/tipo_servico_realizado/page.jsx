'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/service/api';
import styles from '@/styles/Dashboard.module.css';

export default function TipoServicoRealizadoPage() {
  const [servicos, setServicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [erro, setErro] = useState('');
  const [novo, setNovo] = useState({
    id_usuario: '',
    id_cliente: '',
    id_tipo_servico: '',
    data: ''
  });

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) router.push('/');
    else {
      carregarServicos();
      carregarClientes();
      carregarTipos();
    }
  }, []);

  const carregarServicos = async () => {
    try {
      const res = await api.get('/api/tipo_servico_realizado');
      setServicos(res.data);
    } catch (err) {
      console.error(err);
      setErro('Erro ao carregar serviços realizados');
    }
  };

  const carregarClientes = async () => {
    try {
      const res = await api.get('/api/clientes');
      setClientes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const carregarTipos = async () => {
    try {
      const res = await api.get('/api/tipo_servico');
      setTipos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovo({ ...novo, [name]: value });
  };

  const handleCriar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/tipo_servico_realizado', novo);
      setNovo({ id_usuario: '', id_cliente: '', id_tipo_servico: '', data: '' });
      carregarServicos();
    } catch (err) {
      console.error(err);
      setErro('Erro ao criar serviço realizado');
    }
  };

  const handleExcluir = async (id) => {
    if (!confirm('Deseja realmente excluir este serviço realizado?')) return;
    try {
      await api.delete(`/api/tipo_servico_realizado/${id}`);
      carregarServicos();
    } catch (err) {
      console.error(err);
      setErro('Erro ao excluir serviço realizado');
    }
  };

  const iniciarEdicao = (id) => {
    setServicos(servicos.map(s =>
      s.id_tipo_servico_realizado === id ? { ...s, editando: true, original: { ...s } } : s
    ));
  };

  const cancelarEdicao = (id) => {
    setServicos(servicos.map(s =>
      s.id_tipo_servico_realizado === id ? { ...s.original, editando: false } : s
    ));
  };

  const atualizarCampo = (id, campo, valor) => {
    setServicos(servicos.map(s =>
      s.id_tipo_servico_realizado === id ? { ...s, [campo]: valor } : s
    ));
  };

  const salvarEdicao = async (id) => {
    const s = servicos.find(s => s.id_tipo_servico_realizado === id);
    try {
      await api.put(`/api/tipo_servico_realizado/${id}`, {
        id_cliente: s.id_cliente,
        id_tipo_servico: s.id_tipo_servico,
        data: s.data
      });
      carregarServicos();
    } catch (err) {
      console.error(err);
      setErro('Erro ao salvar edição');
    }
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className={styles.dashboardContent}>
      <h2 style={{ marginBottom: '2rem' }}>Serviços Realizados</h2>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <form onSubmit={handleCriar} style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Novo Serviço Realizado</h3>

        <input
          type="number"
          name="id_usuario"
          placeholder="ID do Usuário"
          value={novo.id_usuario}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <select
          name="id_cliente"
          value={novo.id_cliente}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        >
          <option value="">Selecione um Cliente</option>
          {clientes.map((c) => (
            <option key={c.id_cliente} value={c.id_cliente}>
              {c.nome}
            </option>
          ))}
        </select>

        <select
          name="id_tipo_servico"
          value={novo.id_tipo_servico}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        >
          <option value="">Selecione um Tipo de Serviço</option>
          {tipos.map((t) => (
            <option key={t.id_tipo_servico} value={t.id_tipo_servico}>
              {t.nome} — {formatarValor(t.valor)}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="data"
          value={novo.data}
          onChange={handleInputChange}
          className={styles.inputField}
          required
        />

        <button type="submit" className={styles.submitButton}>Cadastrar</button>
      </form>

      {servicos.map((s) => (
        <div
          key={s.id_tipo_servico_realizado}
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
          {s.editando ? (
            <>
              <select
                value={s.id_cliente}
                onChange={(e) => atualizarCampo(s.id_tipo_servico_realizado, 'id_cliente', e.target.value)}
                className={styles.inputField}
              >
                {clientes.map(c => (
                  <option key={c.id_cliente} value={c.id_cliente}>{c.nome}</option>
                ))}
              </select>

              <select
                value={s.id_tipo_servico}
                onChange={(e) => atualizarCampo(s.id_tipo_servico_realizado, 'id_tipo_servico', e.target.value)}
                className={styles.inputField}
              >
                {tipos.map(t => (
                  <option key={t.id_tipo_servico} value={t.id_tipo_servico}>
                    {t.nome} — {formatarValor(t.valor)}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={s.data?.substring(0, 10)}
                onChange={(e) => atualizarCampo(s.id_tipo_servico_realizado, 'data', e.target.value)}
                className={styles.inputField}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => salvarEdicao(s.id_tipo_servico_realizado)} className={styles.submitButton}>Salvar</button>
                <button onClick={() => cancelarEdicao(s.id_tipo_servico_realizado)} className={styles.submitButton}>Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '1.05rem', color: '#5a4a42' }}>
                <strong>Cliente:</strong> {s.cliente?.nome || s.id_cliente} <br />
                <strong>Serviço:</strong> {s.tipo_servico?.nome || s.id_tipo_servico} <br />
                <strong>Descrição:</strong> {s.tipo_servico?.descricao || '-'} <br />
                <strong>Valor:</strong> {formatarValor(s.tipo_servico?.valor || 0)} <br />
                <strong>Data:</strong> {formatarData(s.data)}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => iniciarEdicao(s.id_tipo_servico_realizado)} className={styles.submitButton}>Editar</button>
                <button onClick={() => handleExcluir(s.id_tipo_servico_realizado)} className={styles.submitButton}>Excluir</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
