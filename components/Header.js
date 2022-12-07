import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import LoadingContext from "../context/LoadingContext";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  return (
    <>
      <div
        onClick={() => {
          setCartOpen(false);
        }}
        style={{ display: `${cartOpen ? "block" : "none"}` }}
        className={styles.bluredBg}
      />
      <div
        style={{ display: `${cartOpen ? "block" : "none"}` }}
        className={styles.cartModal}
      ></div>

      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/img/uko-logo.png"
          alt="uko-logo"
          width={93}
          height={34}
          priority
          onClick={() => router.push("/")}
        />
        <Image
          className={`${styles.icon} ${styles.cartIcon}`}
          src="/img/cart.svg"
          alt="uko-logo"
          width={21}
          height={24}
          onClick={() => setCartOpen(true)}
        />
        <div className={styles.profileContainer}>
          <Image
            className={`${styles.icon} ${styles.profileIcon}`}
            src="/img/profile.svg"
            alt="profile"
            width={21}
            height={24}
          ></Image>
          <div className={styles.profileModal}></div>
        </div>

        <div className={styles.menu}>
          <div
            className={`${styles.menuLink} ${
              router.pathname.startsWith("/the-menu") && styles.activeLink
            }`}
            onClick={() => {
              setLoading(true);
              router.push("/the-menu")
            }}
          >
            THE MENU
            <span />
          </div>
          <div
            className={`${styles.menuLink} ${
              router.pathname.startsWith("/our-story") && styles.activeLink
            }`}
            onClick={() => {
              router.push("/our-story");
            }}
          >
            OUR STORY
            <span />
          </div>
          <div
            className={`${styles.menuLink} ${
              router.pathname.startsWith("/branches") && styles.activeLink
            }`}
            onClick={() => router.push("/branches")}
          >
            BRANCHES
            <span />
          </div>
        </div>
      </header>
    </>
  );
}
