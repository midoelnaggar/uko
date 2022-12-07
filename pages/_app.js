import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import styles from "../styles/App.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoriesContext from "../context/CategoriesContext ";
import LoadingContext from "../context/LoadingContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://uko.raqamyat.com/uko/public/api/categories")
      .then((res) => setCategories(res.data.item.data));
  }, []);

  return (
    <AnimatePresence>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <CategoriesContext.Provider value={categories}>
          <div className={styles.app}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </CategoriesContext.Provider>
      </LoadingContext.Provider>
    </AnimatePresence>
  );
}

export default MyApp;
