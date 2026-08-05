import { useEffect } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router";

export default function Dashboard() {
  useEffect(() => {
    const main = document.querySelector("main");
    main.style.all = "unset";
    return () => (main.style = null);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Welcome to Byte&Bits</h2>
        <p className={styles.mainDescription}>
          Where retro gaming never gets old
        </p>
        <p className={styles.content}>
          Trade tips, swap old stories, and geek out over SNES, N64, Game Boy
          and everything in between. Join our great community!
        </p>
          <Link to="/login" className={styles.btn}>Join Us</Link>
      </div>
    </section>
  );
}
