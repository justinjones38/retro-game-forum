import styles from "./AccountFormInputs.module.css";

export default function AccountFormInputs({
  name,
  type,
  val,
  handleChange,
  placeholder,
  children,
}) {
  return (
    <div className={styles.formItem}>
      <label htmlFor={name} className={styles.label}>
        {children}
      </label>
      <input
        type={type}
        value={val}
        onChange={handleChange}
        id={name}
        name={name}
        placeholder={placeholder}
        className={styles.input}
        required
      />
    </div>
  );
}
