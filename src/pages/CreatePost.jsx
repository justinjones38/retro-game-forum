import { useState } from "react";
import styles from "./CreatePost.module.css";
import { Navigate, useNavigate } from "react-router";
import { supabase } from "../services/createClient";

export default function CreatePost() {
  const username = localStorage.getItem("username");
  const [post, setPost] = useState({
    title: "",
    message: ""
  })

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
      const {data, error} = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single()
      if(error) {
        throw new Error();
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
      console.log(error);
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
        <label htmlFor="title" className={styles.input}>Title</label>
        <input 
          type="text"
          value={post.title}
          onChange={handleChange}
          placeholder="Favorite 2000s game"
          className={styles.input}
          name="title"
          id="title"
        />
        <label htmlFor="message" className={styles.input}>Message</label>
        <textarea 
          className={styles.textarea}
          value={post.message}
          onChange={handleChange}
          name="message"
          id="message"
        >
        </textarea>
        <button>Submit</button>
      </form>


    </section>
  )
}