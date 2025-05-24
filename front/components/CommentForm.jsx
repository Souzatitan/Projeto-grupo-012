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

    if (!name || !comment) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Adiciona novo comentário
    const newComment = {
      name,
      comment,
      date: new Date().toLocaleDateString('pt-BR')
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
    <section className={styles.reportSection} id="report">
      <h3>Deixe Seu Depoimento</h3>
      
      <div className={styles.commentContainer}>
        <form 
          onSubmit={handleSubmit}
          className={styles.commentForm}
        >
          {error && <span className={styles.errorMessage}>{error}</span>}
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Seu Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
              className={styles.nameField}
              placeholder="Digite seu nome"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment">Seu Depoimento</label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              maxLength={maxChars}
              required
              className={styles.commentField}
              placeholder={`Máximo ${maxChars} caracteres`}
            />
            <span className={styles.charCounter}>
              {charCount}/{maxChars}
            </span>
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar Depoimento
          </button>
        </form>

        <div className={styles.commentsList}>
          <h4>Últimos Depoimentos</h4>
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={index} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{c.name}</span>
                  <span className={styles.commentDate}>{c.date}</span>
                </div>
                <p className={styles.commentContent}>{c.comment}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#a08b7d', fontStyle: 'italic' }}>
              Seja o primeiro a deixar um depoimento!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}