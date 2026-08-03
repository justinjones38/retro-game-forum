import styles from "./Replies.module.css";
import { supabase } from "../services/createClient";
import { useEffect, useState } from "react";
import { getTimeDiff } from "../utils/utils";

export default function Replies({ id }) {
  const [repliesList, setRepliesList] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("replies")
          .select(
            `*,
              users(*),
              posts(*)`,
          )
          .eq("post_id", id);
        setRepliesList(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(repliesList);
    const submitReply = async(e) => {
      e.preventDefault();
  
      const {error} = await supabase
        .from("replies")
        .insert({
          user_id: post.users.id,
          post_id: id,
          message: reply,
        }) 
  
      setReply("");
    }

  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={submitReply}>
          <input 
            type="text"
            className={styles.textInput}
            id="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Add a Comment"
          />
          <button>Reply</button>
        </form>
        <ul className={styles.repliesList}>
          {repliesList?.length > 0 ?
          repliesList.map(reply => (
            <li key={reply.id} className={styles.listItem}>
              <p className={styles.author}>
                {reply.users.username} <span>{getTimeDiff(reply.created_at)}</span>
              </p>
              <p className={styles.message}>{reply.message}</p>
            </li>
          )) : <p>No comments</p>} 
        </ul>
        
    </div>
  );
}
