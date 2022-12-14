import Image from "next/image";
import { useRouter } from "next/router";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useContext, useState, useEffect } from "react";
import styles from "../styles/Header.module.scss";
import LoginDetailsContext from "../context/LoginDetailsContext";
import CartContext from "../context/CartContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import Loading from "./Loading";

export default function Header() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);
  const { cart, setCart } = useContext(CartContext);
  const [cookies, setCookies, removeCookies] = useCookies("auth");
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const handleRemove = async (itemId) => {
    setCartLoading(true);
    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/cart/delete",
        { id: itemId },
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
        setCartLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
      setCartLoading(false);
    }
  };

  const handleCartMinus = async (item) => {
    setCartLoading(true);
    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/cart/sub",
        { product_id: item?.id,size_id :item?.size_id},
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
        setCartLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
      setCartLoading(false);
    }
  };

  const handleCartPlus = async (item) => {
    setCartLoading(true);
    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/cart/add",
        { product_id: item?.id,size_id: item?.size_id },
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
        setCartLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (cartModalOpen) {
      document.body.style.overflowY = "hidden";
    }
    return () => (document.body.style.overflowY = "scroll");
  }, [cartModalOpen]);

  useEffect(() => {
    console.log(cart?.orderDetails?.data?.length);
    if (cart?.orderDetails?.data?.length === 0 || cart?.orderDetails?.data?.length === undefined) {
      setCartModalOpen(false)
    }
  }, [cart]);

  return (
    <>
      <div
        onClick={() => {
          setCartModalOpen(false);
          setProfileMenuOpen(false);
          setCartLoading(false);
        }}
        style={{
          display: `${cartModalOpen || profileMenuOpen ? "block" : "none"}`,
          backdropFilter: `${cartModalOpen ? "blur(20px)" : "none"}`,
        }}
        z
        className={styles.bluredBg}
      />
      
      <div
        style={{ display: `${cartModalOpen ? "flex" : "none"}` }}
        className={styles.cartModal}
      >
        <div
          className={styles.cartLoading}
          style={{ display: `${cartLoading ? "block" : "none"}` }}
        >
          <PropagateLoader color="var(--firColor)" />
        </div>
        <div className={styles.cartHeader}>
          <h1>Your Bag</h1>
          <h5>
            {cart?.orderDetails?.data?.length || 0}
            <span />
          </h5>
        </div>
        <div className={styles.cartContent}>
          {cart?.orderDetails?.data?.length > 0 ? (
            <div className={styles.items}>
              {cart?.orderDetails?.data?.map((item) => {
                return (
                  <>
                    <div className={styles.item}>
                      <div className={styles.details}>
                        <div className={styles.nameAndSize}>
                          <div className={styles.name}>{item?.name}</div>
                          <div className={styles.size}>{`/ ${item?.size}`}</div>
                        </div>
                        <div className={styles.results}></div>
                        <div className={styles.priceAndQty}>
                          <div className={styles.price}>
                            {item?.item_price}
                            <span>{" EGP"}</span>
                          </div>
                          <div className={styles.qty}>
                            <div
                              onClick={() => handleCartMinus(item)}
                              className={styles.btn}
                            >
                              <img src="/img/minus.svg" alt="minus" />
                            </div>{" "}
                            <div className={styles.number}> {item?.qty}</div>{" "}
                            <div
                              onClick={() => handleCartPlus(item)}
                              className={styles.btn}
                            >
                              <img src="/img/plus.svg" alt="plus" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.comments}></div>
                      </div>
                      <div className={styles.removeAndSubtotal}>
                        <div
                          onClick={() => handleRemove(item?.id)}
                          className={styles.remove}
                        >
                          remove
                        </div>

                        <div className={styles.subtotal}>
                          <div className={styles.title}>subtotal</div>
                          <div className={styles.number}>
                            {item?.price}
                            <span>{" EGP"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.divider} />
                  </>
                );
              })}
            </div>
          ) : (
            <div className={styles.noItems}>
              <img src="/img/bag.svg" alt="empty-bag" />
            </div>
          )}
        </div>
        <div className={styles.cartFooter}>
          {cart?.orderDetails?.data?.length > 0 ? (
           <>
           <div className={styles.total}>
            <div>
              <div className={styles.title}>Total (INCL. VAT)</div>
            <div className={styles.number}>
            {cart?.total_price}<span> EGP</span>
            </div>
            </div>
            </div>
            <div className={styles.checkoutOrCancel}>
              <div className={styles.checkout}>Checkout</div>
              <div className={styles.cancel}>X</div>
            </div>
            </>
          ) : (
            <>
              <div className={styles.yourBagIsEmpty}>Your bag is empty...</div>
              <div
                onClick={() => {
                  setCartModalOpen(false);
                  router.push("/the-menu");
                }}
                className={styles.shopNow}
              >
                Shop Now
              </div>
            </>
          )}
        </div>
      </div>
      <div
        style={{ display: `${profileMenuOpen ? "block" : "none"}` }}
        className={styles.profileMenu}
      >
        {loginDetails?.success === true ? (
          <>
            <Link href="/my-account">My Account</Link>
            <div className={styles.divider} />
            <Link
              onClick={() => {
                removeCookies("auth");
                setLoginDetails({});
                setProfileMenuOpen(false);
                window.location.href = "/";
              }}
              href=""
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link onClick={() => setProfileMenuOpen(false)} href="/sign-in">
              Sign in
            </Link>
            <div className={styles.divider} />
            <Link onClick={() => setProfileMenuOpen(false)} href="/sign-up">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/img/uko-logo.png"
          alt="uko-logo"
          width={93}
          height={34}
          priority
          onClick={() => {
            router.push("/");
          }}
        />
        <div className={styles.cartIconContainer}>
          <Image
            className={`${styles.icon} ${styles.cartIcon}`}
            src="/img/cart.svg"
            alt="cart"
            width={21}
            height={24}
            onClick={() => setCartModalOpen(true)}
          />
          <span
            style={{
              display: `${
                cart?.orderDetails?.data?.length > 0 ? "block" : "none"
              }`,
            }}
          />
        </div>
        <div>
          <Image
            className={`${styles.icon} ${styles.profileIcon}`}
            src="/img/profile.svg"
            alt="profile"
            width={21}
            height={24}
            onClick={() => setProfileMenuOpen(true)}
          ></Image>
        </div>
        <div className={styles.menu}>
          <div
            className={`${styles.menuLink} ${
              router.asPath === "/the-menu" && styles.activeLink
            }`}
            onClick={() => {
              router.push("/the-menu");
            }}
          >
            THE MENU
            <span />
          </div>
        </div>
      </header>
    </>
  );
}
