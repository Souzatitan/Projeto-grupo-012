// components/Header.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import api from '@/src/service/api'; // usa a instância do axios com baseURL e withCredentials
import styles from '@/styles/Header.module.css';

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validação básica
    if (!username.trim()) {
      setErrors({ username: 'Usuário é obrigatório' });
      return;
    }
    
    if (!password.trim()) {
      setErrors({ password: 'Senha é obrigatória' });
      return;
    }

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

  const closeModal = () => {
    setShowLogin(false);
    setUsername('');
    setPassword('');
    setErrors({});
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.logo}>
        <span>Caravelas Móveis</span>
      </div>
      
      <nav className={styles.nav} aria-label="Navegação principal">
        <ul className={styles.navList}>
          <li>
            <Link href="#home" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className={styles.navLink}>
              Sobre
            </Link>
          </li>
          <li>
            <Link href="#services" className={styles.navLink}>
              Serviços
            </Link>
          </li>
          <li>
            <Link href="#contact" className={styles.navLink}>
              Contato
            </Link>
          </li>
          <li>
            <Link href="#report" className={styles.navLink}>
              Depoimentos
            </Link>
          </li>
          <li>
            <button 
              onClick={() => setShowLogin(true)}
              className={styles.loginButton}
              aria-label="Abrir modal de login administrativo"
            >
              Login
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal de Login */}
      {showLogin && (
        <div 
          className={styles.loginModal}
          role="dialog"
          aria-labelledby="login-title"
          aria-describedby="login-description"
          aria-modal="true"
        >
          <div className={styles.modalContent}>
            <button 
              onClick={closeModal}
              className={styles.closeButton}
              aria-label="Fechar modal de login"
            >
              &times;
            </button>
            
            <h2 id="login-title">Acesso Administrativo</h2>
            <p id="login-description">
              Entre com suas credenciais para acessar o painel de administração do site
            </p>
            
            {errors.general && (
              <div className={styles.errorMessage} role="alert">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleLogin} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                  Usuário <span aria-hidden="true">*</span>
                  <span className="sr-only">obrigatório</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: '' });
                  }}
                  className={`${styles.inputField} ${errors.username ? styles.error : ''}`}
                  required
                  aria-required="true"
                  aria-invalid={errors.username ? "true" : "false"}
                  aria-describedby={errors.username ? "username-error" : "username-help"}
                  placeholder="Digite seu usuário"
                />
                {errors.username && (
                  <span id="username-error" className={styles.errorMessage} role="alert">
                    {errors.username}
                  </span>
                )}
                <small id="username-help" className={styles.helpText}>
                  Digite seu nome de usuário administrativo
                </small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Senha <span aria-hidden="true">*</span>
                  <span className="sr-only">obrigatório</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  className={`${styles.inputField} ${errors.password ? styles.error : ''}`}
                  required
                  aria-required="true"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <span id="password-error" className={styles.errorMessage} role="alert">
                    {errors.password}
                  </span>
                )}
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
              >
                Entrar no Painel
              </button>
            </form>

            
          </div>
        </div>
      )}
    </header>
  );
}