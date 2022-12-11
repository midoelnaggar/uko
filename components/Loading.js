import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";

function Loading({style}) {
useEffect(()=>{
  window.scrollTo({top: 0, behavior: 'smooth'});
},[])

  return <div  style={{...style,display:"flex"}}><PropagateLoader color="#f3eddb" />
  </div>

}

export default Loading