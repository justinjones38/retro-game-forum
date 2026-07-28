import { useState } from "react"
import styles from "./Login.module.css"
import { Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("run");

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Login Page</h2>
      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          id="email" 
          placeholder="abc@email.com" 
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          id="password" 
          placeholder="******" 
          className={styles.input}
        />
        <button className={styles.btn}>Login</button>
      </form>

      <p className={styles.description}>
        Don't have an account. <Link to="#">Create new account here</Link>
      </p>
    </section>
  )
}

