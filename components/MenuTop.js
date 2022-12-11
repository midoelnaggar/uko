import styles from "../styles/TheMenu.module.css";
import { useContext, useEffect } from "react";
import CategoriesContext from "../context/CategoriesContext ";

export default function MenuTop({ setselectedCategory,selectedCategory}) {
  const categories = useContext(CategoriesContext);

  useEffect(()=>{

  },[selectedCategory])
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
          {categories?.map((category) => {
            return (
              <div
                key={category?.id}
                onClick={() => {
                  const [selectedCat] = categories?.filter(cat=>{
                    return cat?.id === category?.id
                  }) 
                  setselectedCategory(selectedCat);
                }}
                className={`${styles.category} ${
                  selectedCategory?.id === category?.id &&
                  styles.categorySelected
                }`}
              >
                <img src="/img/sticks.svg" />
                <div className={styles.categoryName}>{category?.name}</div>
              </div>
            );
          })}
        </div>
      </div>
  );
}
