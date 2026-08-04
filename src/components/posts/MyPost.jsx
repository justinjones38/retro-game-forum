import styles from "./MyPost.module.css"
import { FaArrowUp } from "react-icons/fa";
import { getTimeDiff } from "../../utils/utils";
import { Link } from "react-router";
import { useState } from "react";
import ModalConfirm from "../modals/ModalConfirm";
import ModalForm from "../modals/ModalForm";

export default function MyPost({post, incrementLikesCounter, deletePost, editPost}) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [formInputs, setFormInputs] = useState({
    title: "",
    message: ""
  })

  const handleChange = (e) => setFormInputs(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }))

  const showModal = () => {
    setIsFormEditing(true);
    setFormInputs({
      title: post.title,
      message: post.message
    })
  }

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
          <button 
            className={`${styles.btn} ${styles.editBtn}`}
            onClick={showModal}
          >Edit</button>
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
        {isFormEditing ? 
          <ModalForm handleConfirm={e => editPost(e, post.id, formInputs.title, formInputs.message)} handleReject={() => setIsFormEditing(false)}>
              <label htmlFor="title" className={styles.label}>Title</label>
              <input 
                type="text" 
                value={formInputs.title}
                onChange={handleChange}
                name="title"
                id="title"
                className={styles.input}
              />
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                value={formInputs.message}
                onChange={handleChange}
                name="message"
                id="message"
                className={styles.textarea}
                rows={4}
              ></textarea>

          </ModalForm> : null}
        
      </div>
    </li>
  )
}