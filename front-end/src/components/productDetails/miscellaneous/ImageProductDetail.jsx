import React from "react";

const ImageProductDetail = ({ productImage, productName }) => {
  return (
    <img
      src={productImage}
      alt={productName}
      className=""
      style={{
        width: "56%",
        borderRadius: "1em",
        height: "80vh",
        objectFit: "cover",
        maxHeight: "600px",
        minWidth: "400px",
      }}
    />
  );
};

export default ImageProductDetail;
