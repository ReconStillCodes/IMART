export const postChatSession = async (userId, title, setChatSession) => {
  try {
    const response = await fetch("http://localhost:8080/api/chat-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title }),
    });

    if (!response.ok) {
      console.log("Error post Chat Session");
      return;
    }

    const data = await response.json();
    setChatSession(data);
  } catch (err) {
    console.error("Failed to Post Chat Session ", err);
  }
};
