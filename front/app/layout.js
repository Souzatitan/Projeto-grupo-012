// app/layout.js
import { DM_Sans } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans'
});

export const metadata = {
  title: 'Caravelas Móveis',
  description: 'Serviços de montagem e reparos de móveis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={dmSans.className}>
      <body>
        {children}
        <WhatsAppButton /> {/* Botão adicionado aqui */}
      </body>
    </html>
  );
}