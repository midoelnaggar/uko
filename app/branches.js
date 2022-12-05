import PageMotion from "../components/PageMotion";

function branches() {
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
      branches
    </div>
    </PageMotion>
  );
}

export default branches;
