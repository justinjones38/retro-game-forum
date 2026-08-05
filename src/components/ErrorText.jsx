import styles from "./ErrorText.module.css"

export default function ErrorText({children}) {
  return (
    <div className={styles.container}>
      <p className={styles.alert}>{children}</p>
    </div>
  )
}