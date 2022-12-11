import CategoryMotion from "../components/CategoryMotion";
import styles from "../styles/Category.module.css";

export default function MenuBottom({ selectedCategory, items }) {

  return (
    <>
      <CategoryMotion>
        <div className={styles.title}>
          <img src="/img/menuTitleTop.svg" />
          <div>{selectedCategory?.name}</div>
          <img src="/img/menuTitleBottom.svg" />
        </div>
      </CategoryMotion>
      <CategoryMotion>
        <div className={styles.items}>
          {selectedCategory?.sub_category?.data?.map((subCategory) => {
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
                  {items
                    ?.filter((item) => {
                      return item.sub_category_id == subCategory.id;
                    })
                    .map((item) => {
                      return (
                        <div className={styles.item}>
                          <div>
                            <img
                              className={styles.itemImage}
                              src={item?.image}
                              alt={item?.name}
                            />
                          </div>
                          <div className={styles.itemInfo}>
                            <div className={styles.itemName}>{item?.name}</div>
                            <div className={styles.itemDescription}>
                              {item?.description}
                            </div>
                            <div className={styles.includes}>
                              {item?.result?.split(",")?.map((include) => {
                                return (
                                  <div
                                    style={{ backgroundColor: include?.color }}
                                    className={styles.include}
                                  >
                                    {include}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className={styles.itemPriceAndAddToCart}>
                            <div className={styles.itemPriceFirstLine}>
                              {item?.sizes?.length > 1 ? (
                                item?.sizes
                                  ?.map((size) => {
                                    return Number(size.price);
                                  })
                                  .sort(function (a, b) {
                                    return a - b;
                                  })
                                  .map((price, index, prices) => {
                                    return index === 0 ? (
                                      <>
                                        <div className={styles.itemPriceFrom}>
                                          {`${price} EGP`}
                                        </div>
                                        <div style={{ marginInline: "5px" }}>
                                          {"-"}
                                        </div>
                                      </>
                                    ) : (
                                      index === prices.length - 1 && (
                                        <div className={styles.itemPriceFrom}>
                                          {` ${price} EGP`}
                                        </div>
                                      )
                                    );
                                  })
                              ) : item.old_price === "" ? (
                                <div>{`${item.price} EGP`}</div>
                              ) : (
                                <>
                                  <div>
                                    <div style={{ display: "flex" }}>
                                      <div
                                        style={{ color: "var(--secColor)" }}
                                      >{`${Math.round(
                                        ((Number(item.old_price) -
                                          Number(item.price)) /
                                          Number(item.old_price)) *
                                          100
                                      )}% off`}</div>
                                      <div className={styles.oldPrice}>
                                        <span />
                                        <span />
                                        {`${item.old_price} EGP`}{" "}
                                      </div>
                                    </div>
                                    <div
                                      style={{ textAlign: "end" }}
                                    >{`${item.price} EGP`}</div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className={styles.addToCart}>Add to cart</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </CategoryMotion>
      </>
  );
}