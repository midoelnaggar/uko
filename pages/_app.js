import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import styles from "../styles/App.module.css";
import openSans from "../components/openSans";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoriesContext from "../context/CategoriesContext ";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://uko.raqamyat.com/uko/public/api/categories")
      .then((res) => setCategories(res.data.item.data));
  }, []);

  return (
    <AnimatePresence>
      <CategoriesContext.Provider value={categories}>
        <div className={styles.app}>
          <style jsx global>
            {`
              html {
                font-family: ${openSans.style.fontFamily};
              }
            `}
          </style>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </CategoriesContext.Provider>
    </AnimatePresence>
  );
}

export default MyApp;
