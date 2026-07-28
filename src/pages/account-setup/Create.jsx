import { useState } from "react"
import styles from "./AccountSetup.module.css"
import { Link, useNavigate } from "react-router";
import { supabase } from "../../services/createClient";
import { hashPassword } from "../../utils/utils";

export default function Create() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [inputsCompleted, setInputsCompleted] = useState(false);
  const [emailsMatch, setEmailsMatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !name || !password || !confirmPassword) {
      setInputsCompleted(true);
      return
    }
    if(password !== confirmPassword) {
      setPasswordsMatch(true);
      return
    }

    const {data, error} = await supabase
      .from ("users")
      .select("email")
      

    const emails = data.map(item => item.email);

    if(emails.includes(email)) {
      setEmailsMatch(true);
      return;
    }

    await supabase
      .from("users")
      .insert({
        email,
        password: hashPassword(password),
        name
      })
    
    navigate('/')
  }


  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputsCompleted ? <p className={styles.alert}>Please complete all fields</p> : null}
        {emailsMatch ? <p className={styles.alert}>Email already used</p> : null}
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

        <label htmlFor="name" className={styles.label}>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          id="name" 
          placeholder="John" 
          className={styles.input}
          required
        />

        {passwordsMatch ? <p className={styles.alert}>Passwords do not match</p> : null}
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

        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          id="confirmPassword" 
          placeholder="******" 
          className={styles.input}
          required
        />
        <button className={styles.btn}>Login</button>
      </form>

      <p className={styles.description}>
        Already have an account. <Link to="/login">Login here</Link>
      </p>
    </section>
  )
}

