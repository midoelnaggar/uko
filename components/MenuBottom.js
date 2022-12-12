import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CategoryMotion from "../components/CategoryMotion";
import LoginDetailsContext from "../context/LoginDetailsContext";
import styles from "../styles/Category.module.scss";

export default function MenuBottom({ selectedCategory, items }) {
  const [count, setCount] = useState(1);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { loginDetails } = useContext(LoginDetailsContext);
  const router = useRouter();
  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setItemModalOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <CategoryMotion>
        <div className={styles.title}>
          <img src="/img/menuTitleTop.svg" />
          <div>{selectedCategory?.name}</div>
          <img src="/img/menuTitleBottom.svg" />
        </div>
        <div
          onClick={() => {
            setItemModalOpen(false);
          }}
          style={{
            display: `${itemModalOpen ? "block" : "none"}`,
            backdropFilter: "blur(20px)",
          }}
          className={styles.bluredBg}
        />
        <div
          className={styles.itemModal}
          style={{
            display: `${itemModalOpen ? "flex" : "none"}`,
          }}
        >
          <div className={styles.imageContainer}>
            <img src={selectedItem?.image} />
          </div>
          <div className={styles.name}>{selectedItem?.name}</div>
          <div className={styles.description}>{selectedItem?.description}</div>
          <div className={styles.sizes}>
            {selectedItem?.sizes?.map((size) => {
              return (
                <div className={styles.size}>
                  <div className={styles.left}>
                    <div>
                      <input type={"radio"} name="sizes" value={size?.id} />{" "}
                    </div>
                    <div>
                      <label>{size?.name}</label>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <strong>{size?.price}</strong> EGP
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.divider} />
          <div className={styles.scrollArea}>
            <div className={styles.extras}>
              {selectedItem?.extras?.map((extra) => {
                return (
                  <div className={styles.extra}>
                    <div className={styles.left}>
                      <div>
                        <input
                          type={"checkbox"}
                          name="extra"
                          value={extra?.id}
                        />{" "}
                      </div>
                      <div>
                        <label>{extra?.name}</label>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <strong>{extra?.price}</strong> EGP
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.divider} />
            <div className={styles.types}>
              {selectedItem?.types?.map((type) => {
                return (
                  <div className={styles.type}>
                    <div className={styles.left}>
                      <div>
                        <input type={"radio"} name="types" value={type?.id} />{" "}
                      </div>
                      <div>
                        <label>{type?.name}</label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.divider} />
            <div className={styles.comment}>
              <div className={styles.label}>Comments</div>
              <textarea />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.total}>
            <label>Total</label>
            <div className={styles.right}>
              <strong>18</strong> EGP
            </div>
          </div>
          <div className={styles.counter}>
              <div onClick={()=>setCount(count-1)} className={styles.btn}><img src="/img/minus.svg" alt="minus" /></div>
              <div className={styles.count}>{count}</div>
              <div onClick={()=>setCount(count+1)} className={styles.btn}><img src="/img/plus.svg" alt="plus" />  </div>
          </div>
          <div className={styles.addToBag}>
          Add to Bag
          </div>
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
                            <div
                              onClick={() =>
                                loginDetails?.success === true
                                  ? handleAddToCart(item)
                                  : router.push({
                                      pathname: "/sign-in",
                                      query: { signin: "please-signin" },
                                    })
                              }
                              className={styles.addToCart}
                            >
                              Add to cart
                            </div>
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
