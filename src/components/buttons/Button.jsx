import styles from "./Button.module.css";

export default function Button({ children, ...restProps }) {
  return (
    <button className={styles.btn} {...restProps}>
      {children}
    </button>
  );
}
