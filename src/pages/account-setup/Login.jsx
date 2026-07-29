import { useState } from "react"
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router";
import FormInputs from "../../components/FormInputs";
import { supabase } from "../../services/createClient";
import { useOutletContext } from "react-router";

export default function Login() {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {setIsLoggedIn} = useOutletContext()

  const handleChange = e => {
    setFormInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data, error} = await supabase
        .from("users")
        .select("*")
        .eq("username", formInputs.username)
        .eq("password", formInputs.password)
        .single()

      if(error) {
        throw new Error("Cannot fetch data")
      }

      localStorage.setItem("username", formInputs.username)
      setIsLoggedIn(true);
      navigate("/");
    } catch(error) {
      setError(true)
    } finally {
      setLoading(false)
    }


  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error ? <p className={styles.alert}>Email and/or Password is not correct</p> : null}
      <form className={styles.form} onSubmit={handleSubmit}>
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
          type="password"
          val={formInputs.password}
          handleChange={handleChange}
          id="password"
          placeholder="********"
        >
        Password
        </FormInputs>
        <button className={styles.btn} disabled={loading}> {loading ? "Logging in" : "Login"}</button>
      </form>

      <p className={styles.description}>
        Don't have an account. <Link to="/create">Create new account here</Link>
      </p>
    </section>
  )
}

