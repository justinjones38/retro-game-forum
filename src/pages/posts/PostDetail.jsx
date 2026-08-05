import styles from "./PostDetail.module.css";
import { Navigate, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../services/createClient";
import { getTimeDiff } from "../../utils/utils";
import { FaArrowUp } from "react-icons/fa";
import Loading from "../../components/Loading";
import Replies from "../../components/posts/Replies";
import Button from "../../components/buttons/Button";
import ModalConfirm from "../../components/modals/ModalConfirm";
import ModalForm from "../../components/modals/ModalForm";
import ErrorText from "../../components/error/ErrorText";
import FlagList from "../../components/flags/FlagList";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorAction, setErrorAction] = useState("");
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [updatedForm, setUpdatedForm] = useState({
    title: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(`posts`)
          .select(`*, users(*)`)
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Cannot fetch data");
        }
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const editTextInput = () => {
    setIsFormEditing(true);
    setUpdatedForm({
      title: post.title,
      message: post.message,
    });
  };

  const handleUpdatedForm = (e) =>
    setUpdatedForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleEditPost = async () => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ title: updatedForm.title, message: updatedForm.message })
        .eq("id", id);

      if (error) {
        throw new Error("Cannot update data");
      }

      setPost((prev) => ({
        ...prev,
        title: updatedForm.title,
        message: updatedForm.message,
      }));
      setIsFormEditing(false);
      setErrorAction("")
    } catch (error) {
      setErrorAction(error.message);
    }
  };

  const deletePost = async () => {
    try {
      const { error } = await supabase.from("posts").delete("*").eq("id", id);

      if (error) {
        throw new Error("Cannot delete data right now. Please try again later");
      }
      navigate("/");
      setErrorAction("")
    } catch (error) {
      setErrorAction(error);
    }
  };

  const incrementLikes = async () => {
    const oldPost = { ...post };
    try {
      setPost((prev) => ({
        ...prev,
        likes: prev.likes + 1,
      }));

      const { error } = await supabase
        .from("posts")
        .update({ likes: oldPost.likes + 1 })
        .eq("id", id);
      if (error) {
        setPost(post);
        throw new Error("Cannot like post right now. Please try again later");
      }
      setErrorAction("")
    } catch (error) {
      setErrorAction(error.message);
      setPost(oldPost);
    }
  };

  return (
    <section className={styles.container}>
      {loading ? <Loading /> : null}
      {error ? <ErrorText>{error}</ErrorText> : null}
      {errorAction ? <ErrorText>{errorAction}</ErrorText> : null}
      {!loading && !error && post ? (
        <div className={styles.commentsSection}>
          <div className={styles.mainContentWrapper}>
            <div className={styles.postContent}>
              {post.flags ? <FlagList flags={post.flags} /> : null}
              <h2 className={styles.title}>{post.title}</h2>
              <div className={styles.postDetails}>
                <p className={styles.authorDetails}>
                  {post.users.username} -{" "}
                  <span>{getTimeDiff(post.created_at)}</span>
                </p>
                {username === post.users.username ? (
                  <div className={styles.btnContainer}>
                    <button
                      className={`${styles.btn} ${styles.editBtn}`}
                      onClick={editTextInput}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.btn} ${styles.deleteBtn}`}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
              <p className={styles.message}>{post.message}</p>
              {post.imgUrl ? (
                <div className={styles.imgContainer}>
                  <img
                    src={post.imgUrl}
                    alt={`An attachment by ${post.username}`}
                    className={styles.img}
                  />
                </div>
              ) : null}
              <button className={styles.upvoteBtn} onClick={incrementLikes}>
                <FaArrowUp /> {post.likes} Upvotes
              </button>
            </div>
          </div>
          <Replies id={id} />
        </div>
      ) : null}

      {isModalOpen ? (
        <ModalConfirm
          handleConfirm={deletePost}
          handleReject={() => setIsModalOpen(false)}
        >
          Are you sure that you want to delete your post?
        </ModalConfirm>
      ) : null}

      {isFormEditing ? (
        <ModalForm
          handleConfirm={handleEditPost}
          handleReject={() => setIsFormEditing(false)}
          isForm={true}
        >
          <>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              value={updatedForm.title}
              id="title"
              name="title"
              onChange={handleUpdatedForm}
              className={styles.input}
            />
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              value={updatedForm.message}
              name="message"
              id="message"
              onChange={handleUpdatedForm}
              className={styles.textarea}
              rows={5}
            ></textarea>
          </>
        </ModalForm>
      ) : null}
    </section>
  );
}
