import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import PageLoadingContext from "../context/PageLoadingContext";
import styles from "../styles/404.module.scss";

export default function NoPage() {
const router = useRouter()
    const { setPageLoading } = useContext(PageLoadingContext);
  useEffect(() => {
    setPageLoading(false);
  }, []);
  return (
    <div className={styles.page}>
      <div className={styles.header}>No Sushi Here</div>
      <div className={styles.imageContainer}>
        <img src="/img/404.svg" alt="404" />
      </div>
      <div onClick={() => router.push("/the-menu")} className={styles.orderNow}>
        <span className={styles.border} />
        <div>Order Now</div>
      </div>
    </div>
  );
}
