import Image from "next/image";
import Link from "next/link";
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
        <div className={styles.menuLink} onClick={() => router.push("/the-menu")}>THE MENU</div>
        <div className={styles.menuLink} onClick={() => router.push("/our-story")}>OUR STORY</div>
        <div className={styles.menuLink} onClick={() => router.push("/branches")}>BRANCHES</div>
      </div>
    </header>
  );
}
