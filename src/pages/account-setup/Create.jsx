import { useState } from "react"
import styles from "./AccountSetup.module.css"
import { Link } from "react-router";

export default function Create() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
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

        <label htmlFor="username" className={styles.label}>Username</label>
        <input 
          type="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          id="username" 
          placeholder="abc123" 
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

        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input 
          type="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          id="confirmPassword" 
          placeholder="******" 
          className={styles.input}
        />
        <button className={styles.btn}>Login</button>
      </form>

      <p className={styles.description}>
        Already have an account. <Link to="/login">Login here</Link>
      </p>
    </section>
  )
}

