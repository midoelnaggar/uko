import MenuLayout from "../../components/MenuLayout";
import PageMotion from "../../components/PageMotion";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function TheMenu() {

const router = useRouter();


const categories = [
  { name: "Sushi", slug:"sushi" },
  
  { name: "Sashimi", slug:"sashimi" },

  { name: "Charco Rolls", slug:"charco-rolls" },

  { name: "Ura Maki Rolls", slug:"ura-maki-rolls" },

  { name: "Uko Special Maki", slug:"uko-special-maki" },

  { name: "Dragon", slug:"dragon" },

  { name: "Bermuda Rolls", slug:"bermuda-rolls" },

  { name: "Fried Maki", slug:"fried-maki" },
];
  useEffect(() => {
   
    setTimeout(()=>    router.push("/the-menu/"+categories[0]?.slug)
    ,1000)

  }, []);

  return (
    <PageMotion>
      <MenuLayout categories={categories} />
    </PageMotion>
  );
}

