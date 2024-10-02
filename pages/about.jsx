import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from '../styles/About.module.css';
import Image from "next/image";
const About = () => {
  return(
    <>
    <Nav/>
    <main className={styles.main}>
      <h1>{'About Something'}</h1>
      <div>
        <p>
          {"Welcome to Something, your premier destination for high-quality keyboards based in the Netherlands. As a dedicated webstore, we specialize in crafting unique, customizable keyboards designed to elevate your typing experience. Our passion for precision and innovation drives us to create products that blend functionality with style, ensuring that every keystroke feels exceptional. At Something, we believe that a great keyboard can enhance productivity and bring joy to everyday tasks. Join our community of keyboard enthusiasts and discover the perfect match for your workspace. Thank you for choosing Something!"}
        </p>
        <Image alt="" src={''} width={350} height={350}/>
      </div>
    </main>
    <Footer/>
    </>
  )
}

export default About;