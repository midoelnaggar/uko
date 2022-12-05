import { cloneElement } from "react";
import styles from "../styles/TheMenu.module.css";
import { useRouter } from "next/router";

export default function MenuLayout({ children, categories }) {
  const router = useRouter();
  return (
    <div className={styles.theMenu}>
      <div className={styles.theMenuTitle}>
        <div className={styles.theMenuTitleJp}>お品書き </div>
        <div className={styles.theMenuTitleTop}>
          <img src="/img/menu.svg" alt="menu" />
          <p>the</p>
          <h1>MENU</h1>
          <span />
        </div>
      </div>
      <div className={styles.categories}>
        {categories.map((category) => {
          return (
            <div
              onClick={() => router.push(`/the-menu/${category?.slug}`)}
              className={`${styles.category} ${
                router.pathname === "/the-menu/" + category?.slug &&
                styles.categorySelected
              }`}
            >
              <img src="/img/sticks.svg" />
              <div className={styles.categoryName}>{category?.name}</div>
            </div>
          );
        })}
      </div>
      {cloneElement(children)}
    </div>
  );
}
