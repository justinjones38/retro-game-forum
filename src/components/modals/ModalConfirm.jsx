import styles from "./ModalConfirm.module.css"

export default function ModalConfirm({children, handleConfirm, handleReject}) {
  console.log("ran");
  return (
    <dialog className={styles.container}>
      <div className={styles.contentWrapper}>
        <p className={styles.header}>{children}!</p>
        <div className={styles.btnContainer}>
          <button className={`${styles.btn} ${styles.btnConfirm}`} onClick={handleConfirm}>
            Yes
          </button>
          <button className={`${styles.btn} ${styles.btnReject}`}  onClick={handleReject}>
            No
          </button>
        </div>
      </div>
    </dialog>
  )
}