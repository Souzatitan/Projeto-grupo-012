'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/service/api';
import styles from '@/styles/Dashboard.module.css'; // Importe os estilos

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/');
    }
  }, []);

  const handleLogout = async () => {
  try {
    await api.post('/api/logout'); 
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }

  localStorage.removeItem('isAdminLoggedIn');
  router.push('/');
};

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Painel Administrativo</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </header>
      
      <div className={styles.dashboardContent}>
        <h2>Bem-vindo à Área Administrativa</h2>
        {/* Conteúdo do dashboard aqui */}
        <div style={{ marginTop: '20px' }}>
          <a href="/clientes">🔗 Acessar Gerenciamento de Clientes</a>
        </div>
        <div style={{ marginTop: '20px' }}>
          <a href="/tipo_servico">🔗 Acessar Serviços</a>
        </div>
        <div style={{ marginTop: '20px' }}>
          <a href="/tipo_servico_realizado">🔗 Serviços Realizados</a>
        </div>
      </div>
    </div>
  );
}