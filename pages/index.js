import Head from "next/head";
import styles from "../styles/Home.module.css";
import PageMotion from "../components/PageMotion";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import CategoriesContext from "../context/CategoriesContext ";
import Loading from "../components/Loading";
import PageLoadingContext from "../context/PageLoadingContext";

export default function Home() {
  const categories = useContext(CategoriesContext);
  const { setPageLoading } = useContext(PageLoadingContext);
  const router = useRouter();
  useEffect(() => {
    setPageLoading(false);
  }, []);

  return categories ? (
    <PageMotion>
      <div className={styles.container}>
        <Head>
          <title>Uko Sushi</title>
          <meta
            name="description"
            content="UKO is an authentic high end digital restaurant, Spanish origin & Japanese heritage contemporary cul"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className={styles.pageHeader}>
            <div className={styles.pageTitle}>
              <div>
                <h1>
                  <span>UKO SUSHI</span>, INDULGE
                </h1>
              </div>
              <div>
                <span />
                <h1>YOUR CRAVINGS</h1>
              </div>
            </div>
            <div
              onClick={() => router.push("/the-menu")}
              className={styles.orderNow}
            >
              <span className={styles.border} />
              <div>Order Now</div>
            </div>
          </div>
          <img
            className={styles.heroImg}
            src="/img/heroImg.png"
            alt="heroImg"
          />
          <div className={styles.ourStory}>
            <div className={styles.ourStoryTitle}>
              <span>僕達の物語</span>
              <h1>Our Story</h1>
            </div>
            <p className={styles.ourStoryParag}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren.
            </p>
          </div>
          <div className={styles.theMenu}>
            <div className={styles.theMenuTitle}>
              <div className={styles.theMenuTitleJp}>お品書き </div>
              <div className={styles.theMenuTitleTop}>
                <img src="/img/menu.svg" alt="menu" />
                <p>the</p>
                <h1>MENU</h1>
                <span />
              </div>
            </div>
            <div className={styles.categories}>
              {categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      router.push({
                        pathname: "/the-menu/",
                        query: {
                          category: category?.id,
                        },
                      });
                    }}
                    className={styles.category}
                  >
                    <div className={styles.categoryNumber}>{index + 1}</div>
                    <div className={styles.categoryName}>{category?.name}</div>
                    <img
                      src={category?.image}
                      className={styles.categoryImage}
                      alt={category?.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </PageMotion>
  ) : (
    <Loading />
  );
}
