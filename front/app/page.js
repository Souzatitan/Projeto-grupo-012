// app/page.jsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentForm from '@/components/CommentForm';
import ContactForm from '@/components/ContactForm';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      
      <main id="main-content" role="main">
        {/* Seção Home */}
        <section 
          className={styles.container} 
          id="home"
          aria-labelledby="home-title"
        >
          <div className={styles.home}>
            <div className={styles.left}>
              <Image 
                src="/assets/image/construtor.png" 
                alt="Profissional de construção trabalhando" 
                width={300}
                height={300}
                priority
                className={styles.image}
              />
            </div>
            
            <div className={styles.center}>
              <h1 id="home-title">Sejam Bem-Vindos</h1>
              <p>
                Oferecemos serviços especializados em montagem e reparo de móveis 
                com qualidade, segurança e garantia. Transforme seus espaços com 
                profissionais experientes.
              </p>
            </div>
            
            <div className={styles.right}>
              <div className={styles.top}>
                <Image 
                  src="/assets/image/desk.png" 
                  alt="Mesa de escritório montada profissionalmente"
                  width={150}
                  height={150}
                  className={styles.image}
                />
              </div>
              <div className={styles.bottom}>
                <Image 
                  src="/assets/image/furadeira.png" 
                  alt="Ferramentas profissionais para montagem"
                  width={150}
                  height={150}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção Sobre */}
        <section 
          className={styles.about} 
          id="about"
          aria-labelledby="about-title"
        >
          <div className={styles.sobre}>
            <div className={styles.aboutme}>
              <h2 id="about-title">Nossa História</h2>
              <p>
                Há mais de 10 anos no mercado, a Caravelas Móveis traz soluções 
                práticas e eficientes para montagem e manutenção de móveis. 
                Nossa equipe é composta por profissionais qualificados que 
                entendem a importância de um trabalho bem executado.
              </p>
              <p>
                Valorizamos a confiança de nossos clientes e nos dedicamos a 
                oferecer serviços que superem expectativas, garantindo 
                satisfação e tranquilidade.
              </p>
            </div>
            <div className={styles.migrate}>
              <Image 
                src="/assets/image/ribeirao.png" 
                alt="Nosso escritório localizado em Ribeirão Preto"
                width={400}
                height={300}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* Seção Serviços */}
        <section 
          className={styles.services} 
          id="services"
          aria-labelledby="services-title"
        >
          <h2 id="services-title">Nossos Serviços</h2>
          <div className={styles.servicesContainer}>
            <div className={styles.serviceCard} role="article">
              <h3>Montagem Profissional</h3>
              <Image 
                src="/assets/image/montagem.png" 
                alt="Montagem de móveis planejados"
                width={200}
                height={200}
                className={styles.serviceImage}
              />
              <p>Montamos seu móvel com segurança, agilidade e técnica profissional.</p>
            </div>
            
            <div className={styles.serviceCard} role="article">
              <h3>Reparos Especializados</h3>
              <Image 
                src="/assets/image/defeito.png" 
                alt="Conserto e reparo de móveis danificados"
                width={200}
                height={200}
                className={styles.serviceImage}
              />
              <p>Consertamos danos e recuperamos seu móvel com materiais de qualidade.</p>
            </div>
            
            <div className={styles.serviceCard} role="article">
              <h3>Desmontagem Cuidadosa</h3>
              <Image 
                src="/assets/image/desmontagem.png" 
                alt="Desmontagem para mudança e transporte"
                width={200}
                height={200}
                className={styles.serviceImage}
              />
              <p>Preparamos seus móveis para transporte seguro e remontagem.</p>
            </div>
          </div>
        </section>

        {/* Seção Contato */}
        <section 
          id="contact"
          aria-labelledby="contact-title"
        >
          <ContactForm />
        </section>

        {/* Seção Depoimentos */}
          <CommentForm />
      </main>

      <Footer />
    </>
  );
}