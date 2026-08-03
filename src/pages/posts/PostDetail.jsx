import { useParams } from "react-router"
import styles from "./PostDetail.module.css"
import { useEffect } from "react";
import { supabase } from "../../services/createClient";

export default function PostDetail(){
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const {data, error} = await supabase
          .from(`posts`)
          .select(`*, users(*)`)
          .eq("id", id)
          .single()
        
        console.log(data);
        
        
        if(error) {
          throw new Error("Cannot fetch data")
        }
      } catch(error) {
        console.log(error.message);
      }

    }
    fetchData();
  }, [])
  console.log(id);
  return (
    <section className={styles.container}>
      <h2>Hello World</h2>
    </section>
  )
}