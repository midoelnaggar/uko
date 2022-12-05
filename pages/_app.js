import { AnimatePresence } from "framer-motion";
import styles from "../styles/App.module.css";
import { Open_Sans } from "@next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence>
    <div className={styles.app}>
      <style jsx global>
        {`
        
        html{
          font-family: ${openSans.style.fontFamily};
        }
        
        `}
      </style>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
    </AnimatePresence>
  );
}

export default MyApp;
