// components/Footer.jsx
import styles from '@/styles/Footer.module.css';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          <span>&copy; {currentYear} Caravelas Móveis. Todos os direitos reservados.</span>
        </div>
        
        <div className={styles.socialLinks}>
          <a
            href="https://instagram.com/caravelasmoveis"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Siga-nos no Instagram"
          >
            <FaInstagram aria-hidden="true" />
          </a>
          
          <a
            href="https://facebook.com/caravelasmoveis"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Curta nossa página no Facebook"
          >
            <FaFacebook aria-hidden="true" />
          </a>
          
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Fale conosco no WhatsApp"
          >
            <FaWhatsapp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}