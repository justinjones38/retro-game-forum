import { useParams } from "react-router"
import styles from "./PostDetail.module.css"

export default function PostDetail(){
  const {id} = useParams();
  console.log(id);
  return (
    <section className={styles.container}>
      <h2>Hello World</h2>
    </section>
  )
}