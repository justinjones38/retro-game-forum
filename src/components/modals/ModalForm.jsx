import styles from "./ModalForm.module.css"

export default function ModalForm({children, handleConfirm, handleReject}) {
  console.log("ran");
  return (
    <dialog className={styles.container}>
      <form className={styles.contentWrapper} onSubmit={handleConfirm}>
        {children}
        <div className={styles.btnContainer}>
          <button className={`${styles.btn} ${styles.btnConfirm}`}>
            Save
          </button>
          <button type="button" className={`${styles.btn} ${styles.btnReject}`} onClick={handleReject}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  )
}