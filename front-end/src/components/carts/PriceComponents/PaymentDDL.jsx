import React, { useState, useEffect } from "react";

import { fetchAllPayments } from "../../utility/paymentUtility/fetchAllPayments";

const PaymentDDL = ({ payment, setPayment }) => {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPayments(setPaymentList);
  }, []);

  useEffect(() => {
    if (paymentList.length > 0) {
      setLoading(false);
    }
  }, [paymentList]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <select
          className="form-select w-100 mt-5 mb-2"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{
            backgroundColor: "white",
            border: "3px solid black",
            outline: "none",
          }}
        >
          {paymentList.length > 0 ? (
            paymentList.map((pay) => (
              <option key={pay.id} value={pay.id}>
                {pay.name}
              </option>
            ))
          ) : (
            <option disabled></option>
          )}
        </select>
      )}
    </>
  );
};

export default PaymentDDL;
