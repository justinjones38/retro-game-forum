import styles from "./FlagLabel.module.css";

export default function FlagLabel({ children, ...restProps }) {
  return (
    <label className={styles.label}>
      <input type="checkbox" className={styles.checkItem} {...restProps} />
      {children}
    </label>
  );
}
