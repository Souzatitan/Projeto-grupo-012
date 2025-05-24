'use client';
import { useState } from 'react';
import Link from 'next/link';
import api from '@/src/service/api'; // usa a instância do axios com baseURL e withCredentials
import styles from '@/styles/Header.module.css';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/login', {
        email: username,
        senha: password
      });

      if (response.data.mensagem === 'Login realizado com sucesso!') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = '/dashboard';
      } else {
        alert(response.data.mensagem || 'Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Caravelas Móveis</div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#about">Sobre</Link></li>
          <li><Link href="#services">Serviços</Link></li>
          <li><Link href="#contact">Contato</Link></li>
          <li><Link href="#report">Depoimentos</Link></li>
          <li>
            <button
              onClick={() => setShowLogin(true)}
              className={styles.loginButton}
            >
              Login
            </button>
          </li>
        </ul>
      </nav>

      {showLogin && (
        <div className={styles.loginModal}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setShowLogin(false)}
              className={styles.closeButton}
            >
              &times;
            </button>

            <h3>Acesso Administrativo</h3>

            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
