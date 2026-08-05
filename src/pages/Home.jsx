import { useOutletContext } from "react-router";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../services/createClient";
import Post from "../components/posts/Post";
import Loading from "../components/Loading";
import Modal from "../components/modals/ModalConfirm";

export default function Home() {
  const username = localStorage.getItem("username");
  const { isLoggedIn } = useOutletContext();
  const [posts, setPosts] = useState(null);
  const [workingPosts, setWorkingPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorLike, setErrorLike] = useState("");
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("created_at");

  const handleChange = (e) => {
    setInput(e.target.value);
    setWorkingPosts(
      posts.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const handleLikePost = async (id) => {
    try {
      const oldWorkingPosts = [...workingPosts];

      setWorkingPosts((prev) =>
        prev.map((prevItem) =>
          prevItem.id === id
            ? { ...prevItem, likes: prevItem.likes + 1 }
            : prevItem,
        ),
      );

      const likedPost = workingPosts.find((item) => item.id === id);
      const { error } = await supabase
        .from("posts")
        .update({ likes: likedPost.likes + 1 })
        .eq("id", id);

      if (error) {
        setWorkingPosts(oldWorkingPosts);
        throw new Error(`Cannot like post now. Please try again later`);
      }
    } catch (error) {
      setErrorLike(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(sortBy);
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select(`*, users(*)`)
          .order("created_at", { ascending: false });

        if (error) {
          throw new Error("Cannot fetch post");
        }

        setPosts(data);
        setWorkingPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setWorkingPosts((prev) =>
      prev?.toSorted((a, b) =>
        sortBy === "created_at"
          ? new Date(b[sortBy]) - new Date(a[sortBy])
          : b[sortBy] - a[sortBy],
      ),
    );
  }, [sortBy, input]);

  return (
    <section className={styles.container}>
      {isLoggedIn ? (
        <h2 className={styles.title}>Welcome {username}!</h2>
      ) : null}
      {loading ? <Loading /> : null}
      <div className={styles.contentInputs}>
        <input
          type="text"
          placeholder="Search posts for title"
          id="title"
          value={input}
          onChange={handleChange}
          aria-label="Search posts for title"
          className={styles.input}
        />
        <select
          className={styles.select}
          id="select"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at">Creation Date</option>
          <option value="likes">Likes Count</option>
        </select>
      </div>

      {!loading && !error && posts && workingPosts?.length === 0 ? (
        <p className={styles.alert}>No forums available</p>
      ) : null}
      {!loading && !error && workingPosts ? (
        <ul className={styles.postList}>
          {workingPosts.map((post) => (
            <Post key={post.id} post={post} handleLikePost={handleLikePost} />
          ))}
        </ul>
      ) : null}
    </section>
  );
}
