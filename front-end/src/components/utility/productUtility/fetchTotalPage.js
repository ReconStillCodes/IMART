export const fetchTotalPage = async (size, setTotalPage) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/total-page/${size}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch total pages");
    }

    const data = await response.json();
    setTotalPage(data);
  } catch (err) {
    console.error("Error fetching total page: ", err);
  }
};
