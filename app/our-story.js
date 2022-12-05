import PageMotion from "../components/PageMotion";

function story() {
  
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
