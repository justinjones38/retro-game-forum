import styles from "./MyPosts.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { supabase } from "../../services/createClient";
import Loading from "../../components/Loading";
import MyPost from "../../components/posts/MyPost";

export default function MyPosts() {
  const username = localStorage.getItem("username");
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorAction, setErrorAction] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
            *, users!inner(*)
            `,
        )
        .eq("users.username", username)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error("Cannot fetch data. Please try again later");
      }

      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const incrementLikesCounter = async (id) => {
    const oldPost = [...posts];
    try {

      setPosts((prev) =>
        prev.map((prevPost) =>
          prevPost.id === id
            ? { ...prevPost, likes: prevPost.likes + 1 }
            : prevPost,
        ),
      );

      const likedPosts = oldPost.find((prevPost) => prevPost.id === id);

      const { error } = await supabase
        .from("posts")
        .update({ likes: likedPosts.likes + 1 })
        .eq("id", id);

      if (error) {
        setPosts(oldPost);
        throw new Error("Cannot like post. Please try again later");
      }
    } catch (error) {
      setErrorAction(error.message)
    }
  };

  const deletePost = async (id) => {
    try {
      const { error } = await supabase.from("posts").delete("*").eq("id", id);

      if (error) {
        throw new Error("Cannot delete post right now. Try again later");
      }

      fetchData();
    } catch (error) {
      setErrorAction(error.message)
    }
  };

  const editPost = async (e, id, title, message) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("posts")
        .update({ title, message })
        .eq("id", id);
      if (error) {
        throw new Error("Cannot edit post. Please try again");
      }
      fetchData();
    } catch (error) {
      setErrorAction(error.message)
    }
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>My Posts</h2>
      {loading ? <Loading /> : null}
      {error ? <p>{error}</p> : null}
      {errorAction ? <p>{errorAction}</p> : null}
      {!loading && !error && posts ? (
        <ul className={styles.postList}>
          {posts.length > 0 ? posts.map((post) => (
            <MyPost
              key={post.id}
              post={post}
              incrementLikesCounter={incrementLikesCounter}
              deletePost={deletePost}
              editPost={editPost}
            />
          )) : <p className={styles.alert}>No posts has been made yet.</p>}
        </ul>
      ) : null}
    </section>
  );
}
