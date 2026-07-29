import { useState } from "react";
import styles from "./AccountSetup.module.css";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../services/createClient";
import { hashPassword } from "../../utils/utils";

export default function Create() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordsMatched, setIsPasswordsMatched] = useState(false);
  const [isInputsCompleted, setInputsCompleted] = useState(false);
  const [isEmailsMatched, setIsEmailsMatched] = useState(false);
  const [isUsernamesMatched, setIsUsernamesMatched] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !username || !password || !confirmPassword) {
      setIsInputsCompleted(true);
      return;
    }
    if (password !== confirmPassword) {
      setIsPasswordsMatched(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .select("email, username");

      if (error) {
        throw new Error("Cannot fetch data");
      }

      const emails = data.map((item) => item.email);
      const users = data.map((item) => item.email);

      if (emails.includes(email)) {
        setIsEmailsMatched(true);
        return;
      }
      if (users.includes(username)) {
        setIsUsernamesMatched(true);
        return;
      }

      await supabase.from("users").insert({
        email,
        password: hashPassword(password),
        username,
      });

      localStorage.setItem("username", username);

      navigate("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {isInputsCompleted ? (
          <p className={styles.alert}>Please complete all fields</p>
        ) : null}
        {isEmailsMatched ? (
          <p className={styles.alert}>Email already used</p>
        ) : null}
        {isUsernamesMatched ? (
          <p className={styles.alert}>Username already used</p>
        ) : null}
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="abc@email.com"
          className={styles.input}
          required
        />

        <label htmlFor="name" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="name"
          placeholder="abc123"
          className={styles.input}
          required
        />

        {isPasswordsMatched ? (
          <p className={styles.alert}>Passwords do not match</p>
        ) : null}
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="******"
          className={styles.input}
          required
        />

        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
          placeholder="******"
          className={styles.input}
          required
        />
        <button className={styles.btn} disabled={loading}>
          {loading ? "Creating Account" : "Create Account"}
        </button>
      </form>

      <p className={styles.description}>
        Already have an account. <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}
