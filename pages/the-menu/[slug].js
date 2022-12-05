import MenuLayout from "../../components/MenuLayout"
import {useRouter} from 'next/router';

function category({categoryData}) {
  const router = useRouter();
const { ab } = router.query
  return (
    <MenuLayout>
    <div>{console.log(ab) && categoryData?.name}</div>
    </MenuLayout>
  )
}

export default category