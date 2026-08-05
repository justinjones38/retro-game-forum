import { useEffect, useState } from "react";
import styles from "./MyAccount.module.css";
import { supabase } from "../../services/createClient";
import { useOutletContext } from "react-router";

export default function MyAccount() {
  const username = localStorage.getItem("username");
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, setTheme } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("username", username);

        setAccountInfo(data);
        if (error) {
          throw new Error("Cannot fetch data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  });

  const handleTheme = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>My Account</h2>
      <div className={styles.contentWrapper}>
        <h3 className={styles.subtitle}>Preferences</h3>
        <div className={styles.miniContainer}>
          <div className={styles.contentDescription}>
            <h4 className={styles.contentHeader}>Theme</h4>
            <p className={styles.contentDescription}>Change the theme</p>
          </div>
          <select value={theme} onChange={handleTheme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.subtitle}>Danger Zone</h3>
        <div className={styles.miniContainer}></div>
        <div className={styles.miniContainer}>
          <div className={styles.description}>
            <h4 className={styles.contentHeader}>Delete all posts</h4>
            <p className={styles.contentDescription}>
              Permanently delete all posts from your account
            </p>
          </div>
          <button>Delete All Posts</button>
        </div>
      </div>
    </section>
  );
}
