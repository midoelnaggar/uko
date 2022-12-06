import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MenuLayout from "../../components/MenuLayout";
import { useRouter } from "next/router";
import CategoriesContext from "../../context/CategoriesContext ";
import CategoryMotion from "../../components/CategoryMotion";
import styles from "../../styles/Category.module.css";
import Loading from "../../components/Loading";
import PageMotion from "../../components/PageMotion";

function category() {
  const categories = useContext(CategoriesContext);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [categoryItems, setCategoryItems] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  const filteredItemst = (a, b) => {
    return a == b;
  };

  useEffect(() => {
    setLoading(true);
    const [cat] = categories?.filter((cat) => {
      return cat?.slug === slug;
    });
    setCategory(cat);
  }, [categories, slug]);

  useEffect(() => {
    axios
      .get(
        "https://uko.raqamyat.com/uko/public/api/products/pages?category_id=" +
          category?.id
      )
      .then((res) => {
        setCategoryItems(res.data.item.data);
      });
  }, [category]);

  useEffect(() => {
    if (categoryItems.length > 0) {
      setLoading(false);
    }
  }, [categoryItems]);

  return (
    <MenuLayout>
      {category ? (
        <CategoryMotion>
          <div className={styles.title}>
            <img src="/img/menuTitleTop.svg" />
            <div>{category?.name}</div>
            <img src="/img/menuTitleBottom.svg" />
          </div>{" "}
        </CategoryMotion>
      ) : (
        <Loading />
      )}
      {loading ? (
        <Loading />
      ) : (
        <CategoryMotion>
          <div className={styles.items}>
            {category?.sub_category?.data?.map((subCategory) => {
              return (
                <div className={styles.subCategory}>
                  <div className={styles.subCategoryTitleAndSubtitle}>
                    <div className={styles.subCategoryTitle}>
                      {subCategory?.name}
                    </div>
                    <div className={styles.subCategorySubitle}>
                      {subCategory?.subtitle}
                    </div>
                  </div>
                  <div className={styles.subCategoryItems}>
                    {categoryItems
                      ?.filter((item) => {
                        return item.sub_category_id == subCategory.id;
                      })
                      .map((item) => {
                        return(<div className={styles.item}>
                          {item?.name}
                        </div>);
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </CategoryMotion>
      )}
    </MenuLayout>
  );
}

export default category;
