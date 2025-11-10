// components/CommentForm.jsx
'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/Comments.module.css';

export default function CommentForm() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 300;

  // Carrega comentários do localStorage
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, []);

  const handleCommentChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setComment(input);
      setCharCount(input.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    if (!regex.test(name)) {
      setError('Apenas letras e espaços são permitidos no nome.');
      return;
    }

    if (!name.trim() || !comment.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (name.trim().length < 2) {
      setError('O nome deve ter pelo menos 2 caracteres.');
      return;
    }

    // Adiciona novo comentário
    const newComment = {
      name: name.trim(),
      comment: comment.trim(),
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    const newComments = [newComment, ...comments.slice(0, 3)];
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    
    // Reseta o formulário
    setName('');
    setComment('');
    setCharCount(0);
    setError('');
  };

  return (
    <section 
      className={styles.reportSection} 
      id="report"
      aria-labelledby="report-title"
    >
      <h2 id="report-title">Deixe Seu Depoimento</h2>
      
      <div className={styles.commentContainer}>
        <form 
          onSubmit={handleSubmit}
          className={styles.commentForm}
          noValidate
        >
          <div className={styles.formHeader}>
            <h3>Compartilhe Sua Experiência</h3>
            <p>Seu depoimento ajuda outros clientes</p>
          </div>

          {error && (
            <div 
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Seu Nome <span aria-hidden="true">*</span>
              <span className="sr-only">obrigatório</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
              aria-required="true"
              className={styles.nameField}
              placeholder="Digite seu nome completo"
              aria-describedby="name-help"
            />
            <small id="name-help" className={styles.helpText}>
              Máximo 20 caracteres
            </small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.label}>
              Seu Depoimento <span aria-hidden="true">*</span>
              <span className="sr-only">obrigatório</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              maxLength={maxChars}
              required
              aria-required="true"
              className={styles.commentField}
              placeholder={`Compartilhe sua experiência (máximo ${maxChars} caracteres)`}
              aria-describedby="comment-help char-counter"
            />
            <div className={styles.fieldInfo}>
              <small id="comment-help" className={styles.helpText}>
                Conte como foi sua experiência com nossos serviços
              </small>
              <span 
                id="char-counter"
                className={styles.charCounter}
                aria-live="polite"
              >
                {charCount}/{maxChars}
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            aria-describedby="comment-help"
          >
            Enviar Depoimento
          </button>
        </form>

        <div 
          className={styles.commentsList}
          aria-labelledby="comments-title"
        >
          <h3 id="comments-title">Últimos Depoimentos</h3>
          
          {comments.length > 0 ? (
            <div className={styles.commentsContainer}>
              {comments.map((c, index) => (
                <article 
                  key={index} 
                  className={styles.comment}
                  aria-labelledby={`comment-${index}-title`}
                >
                  <header className={styles.commentHeader}>
                    <h4 
                      id={`comment-${index}-title`}
                      className={styles.commentAuthor}
                    >
                      {c.name}
                    </h4>
                    <time 
                      dateTime={c.date} 
                      className={styles.commentDate}
                    >
                      {c.date} às {c.time}
                    </time>
                  </header>
                  <div className={styles.commentContent}>
                    <p>{c.comment}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div 
              className={styles.noComments}
              role="status"
              aria-live="polite"
            >
              <p>Nenhum depoimento ainda. Seja o primeiro a compartilhar sua experiência!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}