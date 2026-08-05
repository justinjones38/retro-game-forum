import { useEffect, useState } from "react";
import styles from "./MyAccount.module.css";
import { supabase } from "../../services/createClient";
import { useOutletContext, useNavigate } from "react-router";
import ErrorText from "../../components/error/ErrorText";
import Loading from "../../components/Loading";
import ModalConfirm from "../../components/modals/ModalConfirm";

export default function MyAccount() {
  const username = localStorage.getItem("username");
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorAction, setErrorAction] = useState("");
  const { theme, setTheme } = useOutletContext();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("username", username)
          .single();
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
    fetchData();
  }, []);

  const deletePosts = async () => {
    try {
      const { error } = await supabase
        .from("posts")
        .delete("*")
        .eq("user_id", accountInfo.id);

      if (error) {
        throw new Error("Could not delete posts. Please try again later");
      }
    } catch (error) {
      setErrorAction(error.message);
    } finally {
      setIsPostModalOpen(false);
    }
  };

  const handleTheme = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
  };
  return (
    <section className={styles.container}>
      {error ? <ErrorText>{error}</ErrorText> : null}
      {errorAction ? <ErrorText>{errorAction}</ErrorText> : null}
      {loading ? <Loading /> : null}
      {!error && !loading && accountInfo ? (
        <>
          <h2 className={styles.title}>My Account</h2>
          <div className={styles.contentWrapper}>
            <h3 className={styles.subtitle}>Preferences</h3>
            <div className={styles.miniContainer}>
              <div className={styles.leftContent}>
                <h4 className={styles.contentHeader}>Theme</h4>
                <p className={styles.contentDescription}>
                  Allows you to change the theme of your website
                </p>
              </div>
              <select
                value={theme}
                onChange={handleTheme}
                className={styles.selectMenu}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3 className={styles.subtitle}>Danger Zone</h3>
            <div className={`${styles.miniContainer} ${styles.dangerSection}`}>
              <div className={styles.leftContent}>
                <h4 className={styles.contentHeader}>Delete all posts</h4>
                <p className={styles.contentDescription}>
                  Permanently delete all posts from your account
                </p>
              </div>
              <button
                className={styles.btn}
                onClick={() => setIsPostModalOpen(true)}
              >
                Delete All Posts
              </button>
            </div>
          </div>
        </>
      ) : null}

      {isPostModalOpen ? (
        <ModalConfirm
          handleConfirm={deletePosts}
          handleReject={() => setIsPostModalOpen(false)}
        >
          Are you sure you want to delete all of your posts? This process is
          irreversible.
        </ModalConfirm>
      ) : null}

      {isAccountModalOpen ? (
        <ModalConfirm
          handleConfirm={deleteAccount}
          handleReject={() => setIsAccountModalOpen(false)}
        >
          Are you sure you want to delete your account? This process is
          irreversible.
        </ModalConfirm>
      ) : null}
    </section>
  );
}
