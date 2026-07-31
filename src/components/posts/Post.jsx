import styles from "./Post.module.css"
import { FaArrowCircleUp } from "react-icons/fa";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";

export default function Post({post}) {
  return (
    <li className={styles.postItem}>
      <div className={styles.leftItem}>
        <h3 className={styles.postTitle}>
          <Link to="#">{post.title}</Link>
          </h3>
        <p className={styles.time}>Uploaded {getTimeDiff(post.created_at)} ago</p>
        <p className={styles.author}>Uploaded by {post.users.username}</p>
      </div>
      <div className={styles.rightItem}>
        <FaArrowCircleUp className={styles.icon} />
        <p className={styles.likesCount}>153 upvotes</p>
      </div>
    </li>
  )
}