import styles from "./FlagList.module.css"

export default function FlagList({flags}) {
  return (
    <ul className={styles.flagList}>
      {flags.map((flag, index) => (
        <li key={index} className={styles.flagItem}>
          {flag}
        </li>
      ))}
    </ul>
  );
}
