import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import styles from "../styles/App.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContext from "../context/CartContext";
import LoginDetailsContext from "../context/LoginDetailsContext";
import CategoriesContext from "../context/CategoriesContext ";
import PageLoadingContext from "../context/PageLoadingContext";
import "../styles/globals.css";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [loginDetails, setLoginDetails] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter(); 
  const [cookies, setCookies] = useCookies(["auth"]);

  useEffect(() => {
    router.events.on("routeChangeStart", (url, { shallow }) => {
      if (url !== window.location.pathname) {
        setPageLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    setLoginDetails(cookies.auth);
  }, [cookies]);

  useEffect(() => {
    axios
      .get("https://uko.raqamyat.com/uko/public/api/categories")
      .then((res) => {
        setCategories(res.data.item.data);
      });
     
  }, []);



  useEffect(() => {
    if (loginDetails?.success){
    axios.get(
      "https://uko.raqamyat.com/uko/public/api/cart",
      {
        headers: {
          Authorization: "Bearer " + loginDetails?.item?.data?.token,
        },
      }
    ).then(res=>{
      setCart(res.data.item.data);
    });
  }
  console.log(window.screenTop)
    
  }, [loginDetails]);

  return (
    <CookiesProvider>
      <SnackbarProvider>
        <AnimatePresence>
          <PageLoadingContext.Provider value={{ pageLoading, setPageLoading }}>
            <LoginDetailsContext.Provider
              value={{ loginDetails, setLoginDetails }}
            >
              <CartContext.Provider value={{ cart, setCart }}>
                <CategoriesContext.Provider value={categories}>
                  <div className={styles.app}>
                    {pageLoading && (
                      <Loading
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "80vh",
                        }}
                      />
                    )}
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                  </div>
                </CategoriesContext.Provider>
              </CartContext.Provider>
            </LoginDetailsContext.Provider>
          </PageLoadingContext.Provider>
        </AnimatePresence>
      </SnackbarProvider>
    </CookiesProvider>
  );
}

export default MyApp;
