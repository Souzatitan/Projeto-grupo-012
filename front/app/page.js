// app/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentForm from '@/components/CommentForm';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Seção Principal */}
      <section className={styles.container} id="home">
        <div className={styles.home}>
          <div className={styles.left}>
            <Image 
              src="/assets/image/construtor.png" 
              alt="Profissional de construção" 
              width={300}
              height={300}
              priority
              className={styles.image}
            />
          </div>
          
          <div className={styles.center}>
            <h1>Sejam Bem-Vindos</h1>
            <p>Oferecemos serviços especializados em montagem e reparo de móveis com qualidade e garantia.</p>
          </div>
          
          <div className={styles.right}>
            <div className={styles.top}>
              <Image 
                src="/assets/image/desk.png" 
                alt="Mesa de escritório montada"
                width={150}
                height={150}
                className={styles.image}
              />
            </div>
            <div className={styles.bottom}>
              <Image 
                src="/assets/image/furadeira.png" 
                alt="Ferramentas profissionais"
                width={150}
                height={150}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section className={styles.about} id="about">
        <div className={styles.sobre}>
          <div className={styles.aboutme}>
            <h2>Nossa História</h2>
            <p>Há mais de 10 anos no mercado, trazemos soluções práticas para montagem e manutenção de móveis.</p>
          </div>
          <div className={styles.migrate}>
            <Image 
              src="/assets/image/ribeirao.png" 
              alt="Nosso escritório em Ribeirão Preto"
              width={400}
              height={300}
              className={styles.image}
            />
          </div>
        </div>
      </section>

      {/* Seção Serviços */}
      <section className={styles.services} id="services">
       <h2>Nossos Serviços</h2>
        <div className={styles.servicesContainer}>
         <div className={styles.serviceCard}>
          <h3>Montagem</h3>
           <Image 
             src="/assets/image/montagem.png" 
             alt="Serviço de montagem"
             width={200}
             height={200}
             className={styles.serviceImage}
           />
           <p>Montagem profissional de móveis com garantia</p>
       </div>

    <div className={styles.serviceCard}>
      <h3>Reparos</h3>
      <Image 
        src="/assets/image/defeito.png" 
        alt="Serviço de reparos"
        width={200}
        height={200}
        className={styles.serviceImage}
      />
      <p>Conserto e recuperação de móveis danificados</p>
    </div>

    <div className={styles.serviceCard}>
      <h3>Desmontagem</h3>
      <Image 
        src="/assets/image/desmontagem.png" 
        alt="Serviço de desmontagem"
        width={200}
        height={200}
        className={styles.serviceImage}
      />
      <p>Desmontagem segura para mudanças</p>
    </div>
  </div>
</section>

      {/* Seção de Depoimentos */}
      <section className={styles.report} id="report">
        <h3>Deixe seu Depoimento</h3>
        <CommentForm />
      </section>

      <Footer />
    </>
  );
}