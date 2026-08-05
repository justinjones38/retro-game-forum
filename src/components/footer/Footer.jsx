import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      Built by Justin {"\u00A9"} {year}
    </footer>
  );
}
