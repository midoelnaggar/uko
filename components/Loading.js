import { PropagateLoader } from "react-spinners";

function Loading({style}) {
  return <div  style={{...style,display:"flex"}}><PropagateLoader color="#f3eddb" />
  </div>

}

export default Loading