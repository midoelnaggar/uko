import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useContext, useState, useEffect } from "react";
import PageLoadingContext from "../context/PageLoadingContext";
import styles from "../styles/Header.module.scss";
import LoginDetailsContext from "../context/LoginDetailsContext";
import CartContext from "../context/CartContext";

export default function Header() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);
  const { cart, setCart } = useContext(CartContext);
  const [cookies, setCookies, removeCookies] = useCookies("auth");
  const router = useRouter();
  useEffect(() => {
    if (cartModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return ()=> document.body.style.overflow = "scroll"

  }, [cartModalOpen]);
  return (
    <>
      <div
        onClick={() => {
          setCartModalOpen(false);
          setProfileMenuOpen(false);
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
                return <div className={styles.item}> {item?.name} </div>;
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
            <div className={styles.checkoutOrCancel}>
              <div className={styles.checkout}>Checkout</div>
              <div className={styles.cancel}>X</div>
            </div>
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
              display: `${cart?.orderDetails?.data?.length > 0 && "block"}`,
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
