export const fetchAllPayments = async (setPaymentList) => {
  try {
    const response = await fetch("http://localhost:8080/api/payments");

    if (!response.ok) {
      throw new Error("Failed to fetch payment list");
    }

    const data = await response.json();
    setPaymentList(data);
  } catch (err) {
    console.error("Failed to fetch payment list: ", err);
  }
};
