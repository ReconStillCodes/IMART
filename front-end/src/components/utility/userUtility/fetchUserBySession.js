export const fetchUserBySession = async (sessionKey, setUser) => {
  const session = localStorage.getItem(sessionKey);

  if (!session) {
    setUser(null);
    console.error("No Session Exist : ", sessionKey);
    return;
  }

  const sessionData = JSON.parse(session);

  try {
    const response = await fetch(
      `http://localhost:8080/api/users/${sessionData}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    setUser(data);
  } catch (err) {
    console.error("Failed to Fetch Session ", err);
  }
};
