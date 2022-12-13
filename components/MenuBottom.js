import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useState, useEffect } from "react";
import CategoryMotion from "../components/CategoryMotion";
import CartContext from "../context/CartContext";
import LoginDetailsContext from "../context/LoginDetailsContext";
import styles from "../styles/Category.module.scss";
import Loading from "./Loading";

export default function MenuBottom({ selectedCategory, items }) {
  const [addingItemToCart, setAddingItemToCart] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [itemSize, setItemSize] = useState(null);
  const [itemExtras, setItemExtras] = useState([]);
  const [itemType, setItemType] = useState(null);
  const [itemTotal, setItemTotal] = useState(0);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { loginDetails } = useContext(LoginDetailsContext);
  const { setCart } = useContext(CartContext);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setItemModalOpen(true);
  };

  useEffect(() => {
    if (itemModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return ()=> document.body.style.overflow = "scroll"
  }, [itemModalOpen]);

  const handleAddToBag = async ({ product_id, qty, size_id, type_id }) => {
    setAddingItemToCart(true);

    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/cart/store",
        { product_id, qty, size_id, type_id },
        {
          headers: {
            Authorization: "Bearer " + loginDetails?.item?.data?.token,
          },
        }
      );

      if (res?.status === 200) {
        const res = await axios.get(
          "https://uko.raqamyat.com/uko/public/api/cart",
          {
            headers: {
              Authorization: "Bearer " + loginDetails?.item?.data?.token,
            },
          }
        );
        await setCart(res.data.item.data);
        setAddingItemToCart(false);

      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
      setAddingItemToCart(false)
    }
  };

  useEffect(() => {
    const extrasTotal = itemExtras?.reduce(
      (a, b) => Number(a) + Number(b.price),
      0
    );
    const total = (Number(itemSize?.price) + extrasTotal) * itemCount;
    console.log(itemType);
    setItemTotal(total);
  }, [itemCount, itemSize, itemExtras, itemType]);

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
                      <input
                        type={"radio"}
                        name="sizes"
                        value={size?.id}
                        onChange={() => {
                          setItemSize(size);
                        }}
                      />
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
                          onChange={(e) => {
                            if (e.target.checked) {
                              setItemExtras([...itemExtras, extra]);
                            } else {
                              setItemExtras(itemExtras?.splice(1, extra));
                            }
                          }}
                        />
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
                        <input
                          type={"radio"}
                          name="types"
                          value={type?.id}
                          onClick={() => setItemType(type)}
                        />
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
          <div className={styles.counter}>
            <div
              onClick={() => itemCount > 1 && setItemCount(itemCount - 1)}
              className={styles.btn}
            >
              <img src="/img/minus.svg" alt="minus" />
            </div>
            <div className={styles.count}>{itemCount}</div>
            <div
              onClick={() => setItemCount(itemCount + 1)}
              className={styles.btn}
            >
              <img src="/img/plus.svg" alt="plus" />{" "}
            </div>
          </div>
          <div
            onClick={() =>
              handleAddToBag({
                product_id: selectedItem?.id,
                qty: itemCount,
                size_id: itemSize?.id,
                type_id: itemType?.id,
              })
            }
            className={styles.addToBag}
          >
            {addingItemToCart ? (
              <Loading className={styles.total} style={{height:"40.9px",marginTop:"12px",marginBottom:"-12px"}} />
            ) : (
              <>
                Add to Bag
                {!Number.isNaN(itemTotal) && (
                  <div className={styles.total}>
                    <strong>{itemTotal}</strong> EGP{" "}
                  </div>
                )}
              </>
            )}
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
