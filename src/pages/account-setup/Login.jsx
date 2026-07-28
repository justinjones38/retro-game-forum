import { useState } from "react"
import styles from "./AccountSetup.module.css"
import { Link } from "react-router";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          id="email" 
          placeholder="abc@email.com" 
          className={styles.input}
          required
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          id="password" 
          placeholder="******" 
          className={styles.input}
          required
        />
        <button className={styles.btn}>Login</button>
      </form>

      <p className={styles.description}>
        Don't have an account. <Link to="/create">Create new account here</Link>
      </p>
    </section>
  )
}

