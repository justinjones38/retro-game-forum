import { useOutletContext } from "react-router";
import styles from "./Home.module.css"
import { useEffect, useState } from "react";
import { supabase } from "../services/createClient";
import Post from "../components/Post";

export default function Home() {
  const username = localStorage.getItem("username");
  const {isLoggedIn} = useOutletContext();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const {data, error} = await supabase
          .from("posts")
          .select()

        if(error) {
          throw new Error("Cannot fetch post")
        }

        setPosts(data)
      } catch(error) {
        console.log("error, cannot fetch data")
      }

    }
    fetchData();
  }, [])

  console.log(posts);
  
  if(!posts) {
    return;
  }

  return (
    <section className={styles.container}>
      {isLoggedIn ? <h2 className={styles.title}>Hello {username}! Here are some great recent posts</h2> : null}
      <ul className={styles.postList}>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  )
}