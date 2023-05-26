import styles from "../css/home.module.css";
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.logo}>
          barbel <span>admin</span>
        </h1>
        <section>
          <article className={styles.users}>
            <h1>usuarios</h1>
          </article>

          <article className={styles.bookings}>
            <h1>citas</h1>
          </article>

          <article className={styles.price}>
            <h1>precio</h1>
          </article>
        </section>
      </main>
    </>
  );
}
