// app/layout.js
import { DM_Sans } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Caravelas Móveis - Serviços de Montagem e Reparos',
  description: 'Serviços profissionais de montagem, reparos e desmontagem de móveis. Qualidade e garantia.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={dmSans.className}>
        {/* Skip Link - Agora funcionando corretamente */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}