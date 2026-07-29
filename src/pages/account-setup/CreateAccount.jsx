import { useState } from "react";
import styles from "./CreateAccount.module.css";
import { Link, useNavigate } from "react-router";
import { supabase } from "../../services/createClient";
import { hashPassword } from "../../utils/utils";
import FormInputs from "./FormInputs";

export default function Create() {
  const [formInputs, setFormInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPasswordsMatched, setIsPasswordsMatched] = useState(false);
  const [isInputsCompleted, setInputsCompleted] = useState(false);
  const [isEmailsMatched, setIsEmailsMatched] = useState(false);
  const [isUsernamesMatched, setIsUsernamesMatched] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setFormInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formInputs.email || !formInputs.username || !formInputs.password || !formInputs.confirmPassword) {
      setIsInputsCompleted(true);
      setLoading(false);
      return;
    }
    if (formInputs.password !== formInputs.confirmPassword) {
      setIsPasswordsMatched(true);
      setLoading(false);
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

      if (emails.includes(formInputs.email)) {
        setIsEmailsMatched(true);
        setLoading(false);
        return;
      }
      if (users.includes(formInputs.username)) {
        setIsUsernamesMatched(true);
        setLoading(false);
        return;
      }

      await supabase.from("users").insert({
        email: formInputs.email,
        password: hashPassword(formInputs.password),
        username: formInputs.username,
      });

      localStorage.setItem("username", formInputs.username);

      navigate("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
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

        <FormInputs
          name="email"
          type="email"
          val={formInputs.email}
          handleChange={handleChange}
          placeholder="abc@email.com"
        >
          Email
        </FormInputs>

        <FormInputs
          name="username"
          type="text"
          val={formInputs.username}
          handleChange={handleChange}
          placeholder="abc123"
        >
        Username
        </FormInputs>

        {isPasswordsMatched ? (
          <p className={styles.alert}>Passwords do not match</p>
        ) : null}
        <FormInputs
          name="password"
          type="password"
          val={formInputs.password}
          handleChange={handleChange}
          placeholder="********"
        >
        Password
        </FormInputs>

        <FormInputs
          name="confirmPassword"
          type="password"
          val={formInputs.confirmPasswordpassword}
          handleChange={handleChange}
          placeholder="********"
        >
        Confirm Password
        </FormInputs>

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
