import styles from "./Loading.module.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <section>
      <AiOutlineLoading3Quarters className={styles.loadingScreen} />
    </section>
  )
}