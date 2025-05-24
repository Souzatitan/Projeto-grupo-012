"use client";

import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si'; // Ícone de localização
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  // Link do Google Maps (substitua com o link da sua loja)
  const googleMapsLink = "https://www.google.com/maps/place/SEU+ENDERECO";
  
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>@ Todos os direitos reservados</span>
      <div className={styles.socialIcons}>
        <a 
          href="LINK_DO_INSTAGRAM" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className={styles.icon} color="#E4405F" />
        </a>
        <a 
          href="LINK_DO_FACEBOOK" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook className={styles.icon} color="#1877F2" />
        </a>
        <a 
          href={googleMapsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Localização no Google Maps"
        >
          <SiGooglemaps className={styles.icon} color="#E4291E" />
        </a>
      </div>
    </footer>
  );
}