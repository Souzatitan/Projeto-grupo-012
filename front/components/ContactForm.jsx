'use client'; // Necessário para hooks e eventos
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    texto: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Adicione aqui a lógica de envio (API, etc.)
  };

  return (
    <form className={styles.contato} onSubmit={handleSubmit}>
      <label htmlFor="nome">Seu nome</label>
      <input
        type="text"
        id="nome"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        placeholder="Nome"
      />
      {/* Repita para os outros campos (email, telefone, texto) */}
      <button type="submit">Enviar</button>
    </form>
  );
}