import styles from "./UserPost.module.css";
import { FaArrowUp } from "react-icons/fa";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";
import { useState } from "react";

export default function UserPost({ post, incrementLikesCounter }) {
  return (
    <li className={styles.postItem}>
      <div className={styles.leftItem}>
        <h3 className={styles.postTitle}>
          <Link to={`/posts/${post.id}`} className={styles.postLink}>
            {post.title}
          </Link>
        </h3>
        <p className={styles.time}>posted {getTimeDiff(post.created_at)}</p>
      </div>
      <div className={styles.rightItem}>
        <div className={styles.likesCounter}>
          <button
            className={styles.iconBtn}
            onClick={() => incrementLikesCounter(post.id)}
          >
            <FaArrowUp className={styles.icon} />
          </button>
          <p className={styles.likesCount}>{post.likes}</p>
        </div>
      </div>
    </li>
  );
}
