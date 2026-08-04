import styles from "./MyPost.module.css"
import { FaArrowUp } from "react-icons/fa";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";
import { useState } from "react";
import ModalConfirm from "../modals/ModalConfirm";

export default function MyPost({post, incrementLikesCounter, deletePost}) {
  const [isModalShown, setIsModalShown] = useState(false);
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
          <button 
            className={styles.iconBtn}
            onClick={() => incrementLikesCounter(post.id)}
          ><FaArrowUp className={styles.icon} /></button>
          <p className={styles.likesCount}>{post.likes}</p>
        </div>
        <div className={styles.btnContainer}>
          <button className={`${styles.btn} ${styles.editBtn}`}>Edit</button>
          <button 
            className={`${styles.btn} ${styles.deleteBtn}`}
            onClick={() => setIsModalShown(true)}
          >
            Delete</button>
        </div>
        {isModalShown ?
          <ModalConfirm handleConfirm={() => deletePost(post.id)} handleReject={() => setIsModalShown(false)} >
            Are you sure that you want to delete your post?
          </ModalConfirm> : null}

      </div>
    </li>
  )
}