import PageMotion from "../components/PageMotion";
import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import CategoriesContext from "../context/CategoriesContext ";
import PageLoadingContext from "../context/PageLoadingContext";
import MenuTop from "../components/MenuTop";
import MenuBottom from "../components/MenuBottom";
import axios from "axios";
import { useRouter } from "next/router";


export async function getStaticProps() {
  const res = await axios.get(
    "https://uko.raqamyat.com/uko/public/api/products/pages"
  );
  const items = await res.data.item.data;

  return {
    props: {
      items,
    },
  };
}

export default function TheMenu({ items }) {
  const router = useRouter();
  const {query} = router;
  const [selectedCategory, setselectedCategory] = useState(null);
  const categories = useContext(CategoriesContext);
  const { setPageLoading } = useContext(PageLoadingContext);

  useEffect(() => {
    if (query.category) {
      const [cat] = categories?.filter((category)=> {
        return(category?.id == query.category)
      })
      setPageLoading(false);
      setselectedCategory(cat);
      window.history.replaceState(null, '', '/the-menu')
    }

   else if (Array.isArray(categories) & (categories.length > 0)) {
      setselectedCategory(categories[0]);
      setPageLoading(false);
    }
  }, [categories]);

  return (
    <>
      <Head>
        <title>{`${selectedCategory?.name} - Menu - Uko Sushi `}</title>
        <meta
          name="description"
          content="UKO is an authentic high end digital restaurant, Spanish origin & Japanese heritage contemporary cul"
        />
      </Head>
      <PageMotion>
        <MenuTop
          categories={categories}
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
        />
        <MenuBottom selectedCategory={selectedCategory} items={items} />
      </PageMotion>
    </>
  );
}
