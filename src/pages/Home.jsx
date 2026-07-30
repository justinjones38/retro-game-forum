import { useOutletContext } from "react-router";
import styles from "./Home.module.css"
import { useEffect, useState } from "react";
import { supabase } from "../services/createClient";
import Post from "../components/Post";
import Loading from "../components/Loading";

export default function Home() {
  const username = localStorage.getItem("username");
  const {isLoggedIn} = useOutletContext();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true)
        const {data, error} = await supabase
          .from("posts")
          .select(`*, users(*)`)
          .order("created_at", {ascending: false})

        if(error) {
          throw new Error("Cannot fetch post")
        }

        setPosts(data)
        console.log(data);
      } catch(error) {
        console.log("error, cannot fetch data")
      } finally {
        setLoading(false);
      }

    }
    fetchData();
  }, [])

  console.log(posts);
  


  return (
    <section className={styles.container}>
      {isLoggedIn ? <h2 className={styles.title}>Welcome {username}!</h2> : null}
      {loading ? <Loading /> : null}
  
      {!loading && !error && posts ? 
      <ul className={styles.postList}>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ul> : null}
    </section>
  )
}