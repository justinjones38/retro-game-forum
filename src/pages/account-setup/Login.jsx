import { useState } from "react"
import styles from "./Login.module.css"
import { Link } from "react-router";
import FormInputs from "./FormInputs";

export default function Login() {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setFormInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
        <FormInputs
          name="username"
          type="text"
          val={formInputs.username}
          handleChange={handleChange}
          id="username"
          placeholder="abc123"
        >
        Username
        </FormInputs>

        <FormInputs
          name="password"
          type="text"
          val={formInputs.password}
          handleChange={handleChange}
          id="password"
          placeholder="********"
        >
        Password
        </FormInputs>
        <button className={styles.btn}>Login</button>
      </form>

      <p className={styles.description}>
        Don't have an account. <Link to="/create">Create new account here</Link>
      </p>
    </section>
  )
}

