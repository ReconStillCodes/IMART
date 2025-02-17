import { useEffect, useState } from "react";

const useFetchProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Error fetching product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch Product: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

export default useFetchProduct;
