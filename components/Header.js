import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src="/img/uko-logo.png"
        alt="uko-logo"
        width={93}
        height={34}
        onClick={() => router.push("/")}
      />
      <Image
        className={styles.icon}
        src="/img/cart.svg"
        alt="uko-logo"
        width={21}
        height={24}
      />
      <Image
        className={styles.icon}
        src="/img/profile.svg"
        alt="profile"
        width={21}
        height={24}
      />
      <div className={styles.menu}>
        <div
          className={`${styles.menuLink} ${
            router.pathname.startsWith("/the-menu") && styles.activeLink
          }`}
          onClick={() => router.push("/the-menu")}
        >
          THE MENU
          <span />
        </div>
        <div
          className={`${styles.menuLink} ${
            router.pathname.startsWith("/our-story") && styles.activeLink
          }`}
          onClick={() => router.push("/our-story")}
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
  );
}
