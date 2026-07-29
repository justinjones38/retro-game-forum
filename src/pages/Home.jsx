import { useOutletContext } from "react-router";
import styles from "./Home.module.css"

export default function Home() {
  const username = localStorage.getItem("username") || "";
  const {isLoggedIn} = useOutletContext();

  return (
    <section className={styles.container}>
      {isLoggedIn ? <h2 className={styles.title}>Hello {username}</h2> : null}
    </section>
  )
}