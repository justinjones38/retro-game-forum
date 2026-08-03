import { useState } from "react";
import styles from "./CreatePost.module.css";
import { Navigate, useNavigate } from "react-router";
import { supabase } from "../../services/createClient";
import Button from "../../components/buttons/Button";

export default function CreatePost() {
  const username = localStorage.getItem("username");
  const [post, setPost] = useState({
    title: "",
    message: ""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setPost(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }))

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("form ran")
    if(!post.title || !post.message) {
      return;
    }

    try {
      setLoading(true)
      const {data, error} = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single()
      if(error) {
        throw new Error("Cannot fetch data");
      }

      await supabase
        .from("posts")
        .insert({
          title: post.title,
          message: post.message,
          user_id: data.id
        })

      navigate("/")

      
    } catch(error) {
      setError(true)
      console.log(error);
    } finally {
      setLoading(false);
    }

  }


  if(!username) {
    <Navigate to="/login" state={{message: "Please login before creating post"}} />
    return;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Create New Post</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>Title</label>
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
        <label htmlFor="message" className={styles.label}>Message</label>
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
        >
        </textarea>
        <Button disabled={loading}>{loading ? "Submitting Form" : "Submit"}</Button>
      </form>


    </section>
  )
}