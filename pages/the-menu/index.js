import MenuLayout from "../../components/MenuLayout";
import PageMotion from "../../components/PageMotion";
import { useRouter } from "next/navigation"
import { useEffect, useContext } from "react";
import CategoriesContext from "../../context/CategoriesContext ";

export default function TheMenu() {
const router = useRouter();
const categories = useContext(CategoriesContext)


  useEffect(() => {
   
    setTimeout(()=>    router.push("/the-menu/"+categories[0]?.slug)
    ,1000)

  }, []);

  return (
    <PageMotion>
      <MenuLayout />
    </PageMotion>
  );
}

