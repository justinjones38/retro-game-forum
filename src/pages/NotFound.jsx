import styles from "./NotFound.module.css"
import { Link } from "react-router"

export default function NotFound() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Sorry, Your page cannot be found.
      </h2>
      <Link to="/" className={styles.btn}>Please return Home</Link>
    </section>
  )

}