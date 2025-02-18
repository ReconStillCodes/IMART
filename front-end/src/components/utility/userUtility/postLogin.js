export const postLogin = async (email, password, setError, setIsSuccess) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid Login Crendentials");
    }

    const data = await response.json();
    localStorage.setItem("IMART_SESSION", data.id);
    setIsSuccess(true);
  } catch (err) {
    setError(err.message);
  }
};
