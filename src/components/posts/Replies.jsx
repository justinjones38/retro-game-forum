import styles from "./Replies.module.css";
import { supabase } from "../../services/createClient";
import { useEffect, useState } from "react";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";

export default function Replies({ id }) {
  const [repliesList, setRepliesList] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("replies")
        .select(
          `*,
              users(*),
              posts(*)`,
        )
        .eq("post_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error("Cannot fetch replies. Please try again later");
      }
      setRepliesList(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchuserAccount = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();
      if (error) {
        throw new Error("Cannot fetch data");
      }
      setAccountInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchuserAccount();
  }, []);

  console.log(repliesList);
  const submitReply = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("replies").insert({
      user_id: accountInfo.id,
      post_id: id,
      message: reply,
    });

    setReply("");
    fetchData();
  };
  const getCommentsLength = () => {
    if (!repliesList?.length) {
      return `0 Comments`;
    } else if (repliesList.length === 1) {
      return `1 Comment`;
    } else {
      return `${repliesList.length} Comments`;
    }
  };
  return (
    <div className={styles.container}>
      <p className={styles.commentsLength}>{getCommentsLength()}</p>
      <form className={styles.form} onSubmit={submitReply}>
        <input
          type="text"
          className={styles.textInput}
          id="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Add a Comment"
        />
        <button className={styles.btn} disabled={!reply}>
          Reply
        </button>
      </form>
      <ul className={styles.repliesList}>
        {repliesList?.length > 0
          ? repliesList.map((reply) => (
              <li key={reply.id} className={styles.listItem}>
                <p className={styles.author}>
                  <Link
                    className={styles.link}
                    to={`/users/${reply.users.username}`}
                  >
                    {reply.users.username}
                  </Link>{" "}
                  - <span>{getTimeDiff(reply.created_at)}</span>
                </p>
                <p className={styles.message}>{reply.message}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
