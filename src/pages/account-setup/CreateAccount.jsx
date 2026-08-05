import { useState } from "react";
import styles from "./CreateAccount.module.css";
import { Link, useNavigate, useOutletContext } from "react-router";
import { supabase } from "../../services/createClient";
import { hashPassword } from "../../utils/utils";
import AccountFormInputs from "../../components/AccountFormInputs";
import Button from "../../components/buttons/Button";

export default function CreateAccount() {
  const [formInputs, setFormInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  const handleChange = (e) => {
    setFormInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formInputs.email ||
        !formInputs.username ||
        !formInputs.password ||
        !formInputs.confirmPassword
      ) {
        throw new Error("Please complete all fields");
      }
      if (formInputs.password !== formInputs.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formInputs.password.length < 7) {
        throw new Error("Passwords must be at least 7 characters");
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("email, username");

      if (userError) {
        throw new Error("Cannot fetch user data");
      }

      const emails = userData.map((item) => item.email);
      const users = userData.map((item) => item.username);

      if (emails.includes(formInputs.email)) {
        throw new Error("Email already used");
      }
      if (users.includes(formInputs.username)) {
        throw new Error("Username already used");
      }

      const { error: newErrorData } = await supabase.from("users").insert({
        email: formInputs.email,
        password: hashPassword(formInputs.password),
        username: formInputs.username,
      });

      if (newErrorData) {
        throw new Error("Cannot insert data in our database. Please try again");
      }

      localStorage.setItem("username", formInputs.username);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error ? <p className={styles.alert}>{error}</p> : null}

        <AccountFormInputs
          name="email"
          type="email"
          val={formInputs.email}
          handleChange={handleChange}
          placeholder="abc@email.com"
        >
          Email
        </AccountFormInputs>

        <AccountFormInputs
          name="username"
          type="text"
          val={formInputs.username}
          handleChange={handleChange}
          placeholder="abc123"
        >
          Username
        </AccountFormInputs>

        <AccountFormInputs
          name="password"
          type="password"
          val={formInputs.password}
          handleChange={handleChange}
          placeholder="*******"
        >
          Password
        </AccountFormInputs>

        <AccountFormInputs
          name="confirmPassword"
          type="password"
          val={formInputs.confirmPassword}
          handleChange={handleChange}
          placeholder="*******"
        >
          Confirm Password
        </AccountFormInputs>

        <Button disabled={loading}>
          {loading ? "Creating Account" : "Create Account"}
        </Button>
      </form>

      <p className={styles.description}>
        Already have an account. <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}
