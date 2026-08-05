import { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router";
import AccountFormInputs from "../../components/AccountFormInputs";
import { supabase } from "../../services/createClient";
import { useOutletContext } from "react-router";
import { checkPassword } from "../../utils/utils";

export default function Login() {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
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
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", formInputs.username)
        .single();
      console.log(data);
      const isPasswordCorrect = await checkPassword(
        formInputs.password,
        data.password,
      );
      console.log(isPasswordCorrect);

      if (error || !isPasswordCorrect) {
        throw new Error("Email and/or password is not correct");
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
      <h2 className={styles.title}>Login</h2>
      {error ? <p className={styles.alert}>{error}</p> : null}
      <form className={styles.form} onSubmit={handleSubmit}>
        <AccountFormInputs
          name="username"
          type="text"
          val={formInputs.username}
          handleChange={handleChange}
          id="username"
          placeholder="abc123"
        >
          Username
        </AccountFormInputs>

        <AccountFormInputs
          name="password"
          type="password"
          val={formInputs.password}
          handleChange={handleChange}
          id="password"
          placeholder="********"
        >
          Password
        </AccountFormInputs>
        <button className={styles.btn} disabled={loading}>
          {" "}
          {loading ? "Logging in" : "Login"}
        </button>
      </form>

      <p className={styles.description}>
        Don't have an account.{" "}
        <Link to="/create-account">Create new account here</Link>
      </p>
    </section>
  );
}
