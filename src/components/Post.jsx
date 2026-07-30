import styles from "./Post.module.css"
import { FaArrowCircleUp } from "react-icons/fa";
import { getTimeDiff } from "../utils/utils";
export default function Post({post}) {

  return (
    <li className={styles.postItem}>
      <div className={styles.leftItem}>
        <p className={styles.time}>Uploaded {getTimeDiff(post.created_at)} ago</p>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.author}>by test123</p>
      </div>
      <div className={styles.rightItem}>
        <FaArrowCircleUp className={styles.icon} />
        <p className={styles.likesCount}>153 upvotes</p>
      </div>
    </li>
  )
}