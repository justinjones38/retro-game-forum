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
  const [workingPosts, setWorkingPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    setWorkingPosts(posts.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())));
  }
  console.log(input);

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
        setWorkingPosts(data);

      } catch(error) {
        console.log("error, cannot fetch data")
      } finally {
        setLoading(false);
      }

    }
    fetchData();
  }, [])

  


  return (
    <section className={styles.container}>
      {isLoggedIn ? <h2 className={styles.title}>Welcome {username}!</h2> : null}
      {loading ? <Loading /> : null}
      <div className={styles.contentInputs}>
        <input 
          type="text"
          placeholder="Search posts for title"
          value={input}
          onChange={handleChange}
          aria-label="Search posts for title"
          className={styles.input}
        />
        <select className={styles.select}>
          <option>Creation Date</option>
          <option>Likes Count</option>
        </select>
      </div>


      {!loading && !error && posts && workingPosts?.length ===  0 ?
        <p className={styles.alert}>No forums available</p> : null}
      {!loading && !error && workingPosts ? 
      <ul className={styles.postList}>
        {workingPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ul> : null}
    </section>
  )
}