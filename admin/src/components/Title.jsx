import styles from "@/css/title.module.css";
const Title = () => {
  return (
    <>
      <div className="container">
        <h1 className={styles.logo}>
          barbel <span>admin</span>
        </h1>
      </div>
    </>
  );
};

export default Title;
