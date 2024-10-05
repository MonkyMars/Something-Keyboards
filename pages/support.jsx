import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../styles/Support.module.css';

const Support = () => {
  return(
    <>
    <Nav/>
      <main className={styles.main}>
        
        <div>
        <h2>{'Support'}</h2>
        </div>
      </main>
    <Footer/>
    </>
  )
}

export default Support;