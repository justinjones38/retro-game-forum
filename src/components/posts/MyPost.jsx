import styles from "./MyPost.module.css"
import { FaArrowUp } from "react-icons/fa";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";

export default function MyPost({post}) {
  return (
    <li className={styles.postItem}>
      <div className={styles.leftItem}>
        <h3 className={styles.postTitle}>
          <Link to={`/posts/${post.id}`} className={styles.postLink}>{post.title}</Link>
          </h3>
        <p className={styles.time}>posted {getTimeDiff(post.created_at)}</p>
      </div>
      <div className={styles.rightItem}>
        <div className={styles.likesCounter}>
          <FaArrowUp className={styles.icon} />
          <p className={styles.likesCount}>{post.likes}</p>
        </div>
        <div className={styles.btnContainer}>
          <button className={`${styles.btn} ${styles.editBtn}`}>Edit</button>
          <button className={`${styles.btn} ${styles.deleteBtn}`}>Delete</button>
        </div>

      </div>
    </li>
  )
}