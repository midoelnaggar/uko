import { useContext,useEffect } from "react";
import PageMotion from "../components/PageMotion";
import PageLoadingContext from "../context/PageLoadingContext";


function story() {
  const { setPageLoading } = useContext(PageLoadingContext);

  useEffect(() => {
    setPageLoading(false);
  }, []);


  return (
    <PageMotion>
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "150px",
        textTransform: "uppercase",
        fontFamily: "var(--secFont)",
      }}
    >
      our story
    </div>
    </PageMotion>

  );
}

export default story;
