import styles from "./Loading.module.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <p>
      <AiOutlineLoading3Quarters className={styles.loadingScreen} />
    </p>
  )
}