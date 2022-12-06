import styles from "../styles/TheMenu.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";

import CategoriesContext from "../context/CategoriesContext ";

export default function MenuLayout({ children }) {
  const router = useRouter();
  const categories = useContext(CategoriesContext);
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
                key={category?.id}
                onClick={() => {
                  router.push(`/the-menu/${category?.slug}`);
                }}
                className={`${styles.category} ${
                  router.asPath === "/the-menu/" + category?.slug &&
                  styles.categorySelected
                }`}
              >
                <img src="/img/sticks.svg" />
                <div className={styles.categoryName}>{category?.name}</div>
              </div>
            );
          })}
        </div>
        {children}
      </div>
  );
}
