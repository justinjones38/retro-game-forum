import styles from "./CreatePost.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { supabase } from "../../services/createClient";
import Button from "../../components/buttons/Button";
import FlagLabel from "../../components/flags/FlagLabel";
import FlagForm from "../../components/flags/FlagForm";
import ErrorText from "../../components/error/ErrorText";

export default function CreatePost() {
  const username = localStorage.getItem("username");
  const [post, setPost] = useState({
    title: "",
    message: "",
    imgUrl: "",
    vidUrl: "",
  });
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!post.title || !post.message) {
        throw new Error("Form and/or message fields is empty. Please complete the fields");
      }

      if(post.title.length > 50) {
        throw new Error("Post Title must be 50 characters or less. ")
      }
      
      setLoading(true);
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (userError) {
        throw new Error("Cannot fetch user data. Please try again later");
      }

      const {error: postError} = await supabase.from("posts").insert({
        title: post.title,
        message: post.message,
        imgUrl: post.imgUrl,
        flags: [...checklist],
        user_id: userData.id,
      });

      if(postError) {
        throw new Error("Cannot create post. Please try again later");
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!username) {
    <Navigate
      to="/login"
      state={{ message: "Please login before creating post" }}
    />;
    return;
  }

  const handleChecklist = (e) =>
    setChecklist((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value],
    );
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create New Post</h2>
      {error ? <ErrorText>{error}</ErrorText> : null}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>
          Title *
        </label>
        <input
          type="text"
          value={post.title}
          onChange={handleChange}
          placeholder="Favorite 2000s game"
          className={styles.input}
          name="title"
          id="title"
          required
        />
        <label htmlFor="message" className={styles.label}>
          Message *
        </label>
        <textarea
          className={styles.textarea}
          value={post.message}
          onChange={handleChange}
          name="message"
          id="message"
          className={styles.input}
          rows={5}
          cols={10}
          required
        ></textarea>
        <label htmlFor="imgUrl">
          Image URL <span>(Optional)</span>
        </label>
        <input
          type="text"
          className={styles.urlInput}
          value={post.imgUrl}
          onChange={handleChange}
          name="imgUrl"
          id="imgUrl"
          placeholder="https://example.com"
        />

        <label htmlFor="vidUrl">
          Video URL <span>(Optional)</span>
        </label>
        <input
          type="text"
          className={styles.urlInput}
          value={post.vidUrl}
          onChange={handleChange}
          name="vidUrl"
          id="vidUrl"
          placeholder="https://youtube.com"
        />
        <FlagForm checklist={checklist} handleChecklist={handleChecklist} />
        <Button disabled={loading}>
          {loading ? "Submitting Form" : "Submit"}
        </Button>
      </form>
    </section>
  );
}
