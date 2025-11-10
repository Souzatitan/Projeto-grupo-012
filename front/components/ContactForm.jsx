// components/ContactForm.jsx
'use client';
import { useState } from 'react';
import styles from '@/styles/Contact.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulação de envio - substitua pela sua API
      console.log('Dados do formulário:', formData);
      
      // Aqui você faria o fetch para sua API
      // await fetch('/api/contact', { ... })
      
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      
      // Reseta o formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
      });
      setErrors({});
      
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className={styles.contactSection} 
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={styles.contactContainer}>
        <header className={styles.contactHeader}>
          <h2 id="contact-title">Entre em Contato</h2>
          <p>Preencha o formulário abaixo e retornaremos em breve</p>
        </header>

        <form 
          onSubmit={handleSubmit}
          className={styles.contactForm}
          noValidate
        >
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nome" className={styles.label}>
                Seu Nome <span aria-hidden="true">*</span>
                <span className="sr-only">obrigatório</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.nome ? styles.error : ''}`}
                required
                aria-required="true"
                aria-describedby={errors.nome ? "nome-error" : "nome-help"}
                placeholder="Digite seu nome completo"
              />
              {errors.nome && (
                <span id="nome-error" className={styles.errorMessage} role="alert">
                  {errors.nome}
                </span>
              )}
              <small id="nome-help" className={styles.helpText}>
                Nome completo para contato
              </small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Seu E-mail <span aria-hidden="true">*</span>
                <span className="sr-only">obrigatório</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.email ? styles.error : ''}`}
                required
                aria-required="true"
                aria-describedby={errors.email ? "email-error" : "email-help"}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <span id="email-error" className={styles.errorMessage} role="alert">
                  {errors.email}
                </span>
              )}
              <small id="email-help" className={styles.helpText}>
                Digite um e-mail válido
              </small>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefone" className={styles.label}>
              Telefone <span aria-hidden="true">*</span>
              <span className="sr-only">obrigatório</span>
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={`${styles.inputField} ${errors.telefone ? styles.error : ''}`}
              required
              aria-required="true"
              aria-describedby={errors.telefone ? "telefone-error" : "telefone-help"}
              placeholder="(11) 99999-9999"
            />
            {errors.telefone && (
              <span id="telefone-error" className={styles.errorMessage} role="alert">
                {errors.telefone}
              </span>
            )}
            <small id="telefone-help" className={styles.helpText}>
              Com DDD para contato
            </small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mensagem" className={styles.label}>
              Sua Mensagem <span aria-hidden="true">*</span>
              <span className="sr-only">obrigatório</span>
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows={6}
              className={`${styles.textareaField} ${errors.mensagem ? styles.error : ''}`}
              required
              aria-required="true"
              aria-describedby={errors.mensagem ? "mensagem-error" : "mensagem-help"}
              placeholder="Descreva como podemos ajudá-lo..."
            />
            {errors.mensagem && (
              <span id="mensagem-error" className={styles.errorMessage} role="alert">
                {errors.mensagem}
              </span>
            )}
            <small id="mensagem-help" className={styles.helpText}>
              Descreva detalhadamente sua necessidade
            </small>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
            aria-describedby="submit-help"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
          <small id="submit-help" className={styles.helpText}>
            {isSubmitting ? 'Processando seu envio...' : 'Clique para enviar sua mensagem'}
          </small>
        </form>
      </div>
    </section>
  );
}