import { useParams } from "react-router";
import styles from "./PostDetail.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../services/createClient";
import Loading from "../../components/Loading";
import { getTimeDiff } from "../../utils/utils";
import Replies from "../../components/Replies";
import Button from "../../components/buttons/Button";
import { FaArrowUp } from "react-icons/fa";


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");
  console.log(username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(`posts`)
          .select(`*, users(*)`)
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Cannot fetch data");
        }
        setPost(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(id);
  return (
    <section className={styles.container}>
      {loading ? <Loading /> : null}
      {error ? <p>{error.message}</p> : null}
      {!loading && !error && post ? (
        <div className={styles.contentWrapper}>
          <div className={styles.postContent}>
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.postDetails}>
              <p className={styles.authorDetails}>
                {post.users.username} -{" "}
                <span>{getTimeDiff(post.created_at)}</span>
              </p>
              {username === post.users.username ? (
                <div className={styles.btnContainer}>
                  <button className={`${styles.btn} ${styles.editBtn}`}>
                    Edit
                  </button>
                  <button className={`${styles.btn} ${styles.deleteBtn}`}>
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
            <p className={styles.message}>{post.message}</p>
            <button className={styles.upvoteBtn}>
              <FaArrowUp /> {' '}
              {post.likes} Upvotes</button>
          </div>
        </div>
      ) : null}
      <Replies id={id} />
    </section>
  );
}
