import styles from "./Modal.module.css"

export default function Modal({children}) {
  return (
    <dialog className={styles.container}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.test}>Hello Modals!</h2>
      </div>
    </dialog>
  )
}