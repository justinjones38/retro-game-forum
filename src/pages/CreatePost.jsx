import styles from "./CreatePost.module.css";
import { Navigate } from "react-router";

export default function CreatePost() {
  const username = localStorage.getItem("username");

  if(!username) {
    <Navigate to="/login" state={{message: "Please login before creating post"}} />
    return;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Hello {username}</h2>
    </section>
  )
}