import styles from "./Home.module.css"

export default function Home() {
  const username = localStorage.getItem("username") || null;
  console.log(username);

  return (
    <section className={styles.container}>
      {username ? <h2 className={styles.title}>Hello {username}</h2> : null}
    </section>
  )
}