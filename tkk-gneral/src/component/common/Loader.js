import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor:"#eee",
        flexDirection: "column",
        height: "100%",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex:282737373
        // opacity:1
      }}
    >
      <div className="d-flex justify-content-between mx-5 mt-3 mb-5">
        <div className="spinner-border text-success align-self-center loader-lg">
          {/* Loading... */}
        </div>
      </div>
    </div>
  );
};

export default Loader;

const styles = {
  loader: {
    // boxShadow:"3px 3px 3px 3px #aaa",
    borderRadius: "50%",
    display: "flex",
    border: "5px solid #f2f2f2",
    width: 180,
    height: 180,
    overflow: "hidden",
    justifyContent: "center",
    background: "#d4edd1",
    marginTop: "35px",
  },
  logoDiv: {
    display: "flex",
    justifyContent: "center",
  },
};
