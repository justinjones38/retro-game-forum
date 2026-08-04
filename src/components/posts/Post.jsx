import styles from "./Post.module.css"
import { FaArrowUp } from "react-icons/fa";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";

export default function Post({post, handleLikePost}) {
  console.log(post);
  return (
    <li className={styles.postItem}>
      <div className={styles.leftItem}>
        <h3 className={styles.postTitle}>
          <Link to={`posts/${post.id}`} className={styles.titleLink}>{post.title}</Link>
          </h3>
        <p 
          className={styles.description}
          aria-label={`uploaded by ${post.users.username}, posted ${getTimeDiff(post.created_at)} ago`}
        >
          <Link to={`/users/${post.users.username}`}>{post.users.username}</Link> - <span>{getTimeDiff(post.created_at)}</span>
        </p>
      </div>
      <div className={styles.rightItem}>
        <button className={styles.btn} onClick={() => handleLikePost(post.id)}><FaArrowUp className={styles.icon} /></button>
        <p 
          className={styles.likesCount}
          aria-label={`${post.likes} ${post.likes ===  1 ? "like" : "likes"}`}
        >{post.likes}
        </p>
      </div>
    </li>
  )
}