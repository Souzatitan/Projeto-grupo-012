'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/service/api';
import styles from '@/styles/Dashboard.module.css';

export default function TipoServicoPage() {
  const [servicos, setServicos] = useState([]);
  const [novo, setNovo] = useState({ nome: '', descricao: '', valor: '' });
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) router.push('/');
    else carregar();
  }, []);

  const carregar = async () => {
    try {
      const res = await api.get('/api/tipo_servico');
      setServicos(res.data);
    } catch (err) {
      setErro('Erro ao carregar serviços');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovo({ ...novo, [name]: value });
  };

  const criar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/tipo_servico', novo);
      setNovo({ nome: '', descricao: '', valor: '' });
      carregar();
    } catch (err) {
      setErro('Erro ao criar');
    }
  };

  const excluir = async (id) => {
    if (!confirm('Deseja excluir este serviço?')) return;
    await api.delete(`/api/tipo_servico/${id}`);
    carregar();
  };

  const iniciarEdicao = (id) => {
    setServicos(servicos.map(s => s.id_tipo_servico === id ? { ...s, editando: true, original: { ...s } } : s));
  };

  const cancelarEdicao = (id) => {
    setServicos(servicos.map(s => s.id_tipo_servico === id ? { ...s.original, editando: false } : s));
  };

  const atualizarCampo = (id, campo, valor) => {
    setServicos(servicos.map(s => s.id_tipo_servico === id ? { ...s, [campo]: valor } : s));
  };

  const salvar = async (id) => {
    const s = servicos.find(s => s.id_tipo_servico === id);
    await api.put(`/api/tipo_servico/${id}`, s);
    carregar();
  };

  return (
    <div className={styles.dashboardContent}>
      <h2 style={{ marginBottom: '2rem' }}>Tipos de Serviço</h2>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <form onSubmit={criar} style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Novo Tipo de Serviço</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novo.nome}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={novo.descricao}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={novo.valor}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>Cadastrar</button>
      </form>

      {servicos.map(s => (
        <div
          key={s.id_tipo_servico}
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
              <input
                type="text"
                value={s.nome}
                onChange={(e) => atualizarCampo(s.id_tipo_servico, 'nome', e.target.value)}
                className={styles.inputField}
              />
              <input
                type="text"
                value={s.descricao}
                onChange={(e) => atualizarCampo(s.id_tipo_servico, 'descricao', e.target.value)}
                className={styles.inputField}
              />
              <input
                type="number"
                value={s.valor}
                onChange={(e) => atualizarCampo(s.id_tipo_servico, 'valor', e.target.value)}
                className={styles.inputField}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => salvar(s.id_tipo_servico)} className={styles.submitButton}>Salvar</button>
                <button onClick={() => cancelarEdicao(s.id_tipo_servico)} className={styles.submitButton}>Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '1.05rem', color: '#5a4a42' }}>
                <strong>{s.nome}</strong> — {s.descricao} — R$ {parseFloat(s.valor).toFixed(2)}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => iniciarEdicao(s.id_tipo_servico)} className={styles.submitButton}>Editar</button>
                <button onClick={() => excluir(s.id_tipo_servico)} className={styles.submitButton}>Excluir</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
