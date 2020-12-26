import React from "react";
import Tinkokologo from "../../images/tinkoko-logo.png";

const NotFound = () => {
  return (
    <div className="col-md-9 mx-auto "
    style={{
      width: "100%",
      height: "70vh",
      display: "flex",
      alignItems: "center",
    }}

    >
<div  style={{flex:1, width:"100%", justifyContent:"center", textAlign:"center"}}>
<h2>Sorry, this page isn't available.</h2>
      <p>
        {" "}
        The link you followed may be broken, or the page may have been removed.
      </p>
</div>
    </div>
  );
};

export default NotFound;

const styles = {
  loader: {
    boxShadow: "3px 3px 3px 3px #aaa",
    borderRadius: "50%",
    display: "flex",
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
