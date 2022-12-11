import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useContext, useState } from "react";
import PageLoadingContext from "../context/PageLoadingContext";
import styles from "../styles/Header.module.scss";
import LoginDetailsContext from "../context/LoginDetailsContext";

export default function Header() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { setPageLoading } = useContext(PageLoadingContext);
  const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);
  const [cookies, setCookies, removeCookies] = useCookies("auth");
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => {
          setCartModalOpen(false);
          setProfileMenuOpen(false);
        }}
        style={{
          display: `${cartModalOpen || profileMenuOpen ? "block" : "none"}`,
          backdropFilter: `${profileMenuOpen && "none"}`,
        }}
        className={styles.bluredBg}
      />
      <div
        style={{ display: `${cartModalOpen ? "block" : "none"}` }}
        className={styles.cartModal}
      >
        <div className={styles.cartHeader}>
          <h1>Your Bag</h1>
          <h5>
            1<span />
          </h5>
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
              }}
              href="/"
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
            setPageLoading(true);
            router.push("/");
          }}
        />
        <Image
          className={`${styles.icon} ${styles.cartIcon}`}
          src="/img/cart.svg"
          alt="uko-logo"
          width={21}
          height={24}
          onClick={() => setCartModalOpen(true)}
        />
        <Image
          className={`${styles.icon} ${styles.profileIcon}`}
          src="/img/profile.svg"
          alt="profile"
          width={21}
          height={24}
          onClick={() => setProfileMenuOpen(true)}
        ></Image>

        <div className={styles.menu}>
          <div
            className={`${styles.menuLink} ${
              router.asPath === "/the-menu" && styles.activeLink
            }`}
            onClick={() => {
              setPageLoading(true);
              router.push("/the-menu");
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
              setPageLoading(true);
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
            onClick={() => {
              setPageLoading(true);

              router.push("/branches");
            }}
          >
            BRANCHES
            <span />
          </div>
        </div>
      </header>
    </>
  );
}
