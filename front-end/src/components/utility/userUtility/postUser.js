export const postUser = async (
  username,
  email,
  password,
  address,
  role,
  setError,
  setIsSuccess
) => {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, address, role }),
    });

    if (!response.ok) {
      throw new Error("Invalid Register Crendentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setIsSuccess(true);
  } catch (err) {
    setError(err.message);
  }
};
