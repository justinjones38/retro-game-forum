import styles from "./UserInfo.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../services/createClient";
import { getMonthandDate } from "../utils/utils";
import Loading from "../components/Loading";
import UserPost from "../components/posts/UserPost";
import ErrorText from "../components/error/ErrorText";

export default function UserInfo() {
  const [accountInfo, setAccountInfo] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorAction, setErrorAction] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*, posts(*)")
          .eq("username", username)
          .single();
        if (error) {
          throw new Error("Cannot fetch Account Data");
        }

        const sortedLikesData = {
          ...data,
          posts: data.posts.toSorted(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          ),
        };
        setAccountInfo(sortedLikesData);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const incrementLikesCounter = async (id) => {
    const oldAccountInfo = {...accountInfo};
    try {
      setAccountInfo((prev) => ({
        ...prev,
        posts: prev.posts.map((prevPost, index) =>
          prevPost.id === id
            ? { ...prevPost, likes: oldAccountInfo.posts[index].likes + 1 }
            : prevPost,
        ),
      }));

      const postLiked = oldAccountInfo.posts.find((post) => post.id === id);

      const { error } = await supabase
        .from("posts")
        .update({ likes: postLiked.likes + 1 })
        .eq("id", id);

      if (error) {
        throw new Error("Sorry, Cannot like post now. Please try again later");
      }
    } catch (error) {
        setErrorAction(error.message);
        setAccountInfo(oldAccountInfo);
    }
  };

  return (
    <section className={styles.container}>
      {loading ? <Loading /> : null}
      {error ? <ErrorText>{error}</ErrorText> : null}
      {errorAction ? <ErrorText>{errorAction}</ErrorText> : null}
      {!loading && !error && accountInfo ? (
        <div className={styles.userContent}>
          <div className={styles.cardContainer}>
            <div className={`${styles.card} ${styles.primaryCard}`}>
              <h2 className={styles.title}>{accountInfo.username}</h2>
              <p className={styles.description}>
                Member since {getMonthandDate(accountInfo.created_at)}{" "}
              </p>
            </div>
            <div className={styles.secondaryCardContainer}>
              <div className={`${styles.card} ${styles.secondaryCard}`}>
                <p className={styles.postCount}>
                  <span>{accountInfo.posts.length} </span>Posts
                </p>
              </div>
              <div className={`${styles.card} ${styles.secondaryCard}`}>
                <p className={styles.likesCount}>
                  <span>
                    {accountInfo.posts.reduce(
                      (acc, curVal) => acc + curVal.likes,
                      0,
                    )}{" "}
                  </span>
                  Likes received
                </p>
              </div>
            </div>
          </div>

          <ul className={styles.postList}>
            {accountInfo.posts.map((post) => (
              <UserPost
                key={post.id}
                post={post}
                incrementLikesCounter={incrementLikesCounter}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
