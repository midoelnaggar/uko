import styles from "../styles/Footer.module.css";
import moment from "moment/moment";

function Footer() {
  return (
    <footer className={styles.footer}>
              <div className={styles.logo}>
                <img  src="/img/uko-logo.png" alt="uko-logo" />
              </div>
      <div className={styles.copyright}>
      All Rights Reserved © {moment().format("YYYY")}

      </div>
      <div className={styles.madeby}>
      Made with
        <span >
        ♥
        </span>
        by {" "}<a href="https://raqamyat.com" target="_blank"> RAQAMYAT</a>
      </div>
    </footer>
  );
}

export default Footer;
