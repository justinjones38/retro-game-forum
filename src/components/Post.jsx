import styles from "./Post.module.css"

export default function Post({post}) {
  return (
    <li className={styles.postItem}>
      <h3 className={styles.postTitle}>{post.title}</h3>
    </li>
  )
}