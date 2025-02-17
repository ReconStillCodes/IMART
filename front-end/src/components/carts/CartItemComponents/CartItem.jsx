import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const CartItem = () => {
  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="mb-3">
      <div className="d-flex flex-row justify-content-between gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS58b0zbwQZhS6eofkEiIZq36TPoXzC87lH_g&s"
          alt="test"
          className="img-fluid rounded "
          style={{ width: "250px", height: "250px", objectFit: "cover" }}
        />
        <div className="w-100 d-flex flex-column justify-content-between">
          <div>
            <h5>Product Name</h5>
            <p style={{ textAlign: "justify" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              provident vel itaque sint ipsa in optio quaerat blanditiis.
              Ratione officiis, tempore qui reprehenderit illum possimus
              cupiditate eos in ipsa dicta!
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center ">
            <h4>{formatPrice(999999999)}</h4>
            <div className="d-flex gap-2 align-items-center">
              <button
                className="text-dark d-flex justify-content-center align-items-center p-0"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                }}
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>

              <button
                className="p-0 text-dark d-flex rounded-pill justify-content-center align-items-center fw-bold"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "2px solid black",
                  height: "35px",
                  width: "35px",
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <div className="text-center" style={{ minWidth: "2em" }}>
                1
              </div>

              <button
                className="p-0 text-dark d-flex rounded-pill justify-content-center align-items-center fw-bold"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "2px solid black",
                  height: "35px",
                  width: "35px",
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
