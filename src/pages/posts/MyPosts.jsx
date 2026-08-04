import { useEffect } from "react";
import styles from "./MyPosts.module.css"
import { supabase } from "../../services/createClient";
import { useState } from "react";
import Loading from "../../components/Loading";
import MyPost from "../../components/posts/MyPost";

export default function MyPosts() {
  const username = localStorage.getItem("username");
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const {data, error} = await supabase
          .from('posts')
          .select(`
            *, users!inner(*)
            `)
          .eq("users.username", username)
          .order("created_at", {ascending: false})

        if(error) {
          throw new Error("Cannot fetch data");
        }
        
        setPosts(data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const incrementLikesCounter = async(id) => {
    try {
      const oldPost = [...posts];
      console.log(id);

      setPosts(prev => prev.map(prevPost => prevPost.id === id ?
          ({...prevPost, likes: prevPost.likes + 1}) : prevPost
      ))

      const likedPosts = oldPost.find(prevPost => prevPost.id === id)

      const {error} = await supabase 
        .from("posts")
        .update({likes: likedPosts.likes + 1})
        .eq("id", id)
        
      if(error) {
        setPosts(oldPost)
        throw new Error("Cannot add likes");
      }
    } catch(error) {
      console.log(error.message);
    }

  }
  console.log(posts);
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>My Posts</h2>
      {loading ? <Loading /> : null}
      {error ? <p>{error}</p> : null}
      {!loading && !error && posts ? 
        <ul className={styles.postList}>
          {posts.map(post => (
            <MyPost key={post.id} post={post} incrementLikesCounter={incrementLikesCounter} />
          ))}
        </ul> : null}
    </section>
  )
}