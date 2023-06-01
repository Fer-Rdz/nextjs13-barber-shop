import styles from "@/css/dots.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
const Dots = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <section className={styles.dots_bg}>
        <div className={styles.container}>
          <div className={styles.dots_container}>
            <h1 className={styles.title}>accesos directos</h1>
            <div></div>
            <div className={styles.dot_section}>
              <h1>ir al inicio</h1>
              <div className={styles.key}>
                <kbd>ctrl</kbd>
                <kbd>z</kbd>
              </div>
            </div>
            <div className={styles.dot_section}>
              <h1>ir a la info de contacto</h1>
              <div className={styles.key}>
                <kbd>ctrl</kbd>
                <kbd>x</kbd>
              </div>
            </div>
            <div className={styles.dot_section}>
              <h1>ir a escribir una reseña</h1>
              <div className={styles.key}>
                <kbd>ctrl</kbd>
                <kbd>c</kbd>
              </div>
            </div>
            <div className={styles.dot_section}>
              <h1>ir a agendar una cita</h1>
              <div className={styles.key}>
                <kbd>ctrl</kbd>
                <kbd>v</kbd>
              </div>
            </div>
            <div className={styles.dot_section}>
              <h1>ir a mi perfil</h1>
              <div className={styles.key}>
                <kbd>ctrl</kbd>
                <kbd>b</kbd>
              </div>
            </div>
          </div>
          <button className={styles.close} onClick={onClose}>
            <AiFillCloseCircle />
          </button>
        </div>
        {children}
      </section>
    </>
  );
};

export default Dots;
