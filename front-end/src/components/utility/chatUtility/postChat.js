export const postChat = async (sessionId, message, reply, setSentMessage) => {
  try {
    const response = await fetch("http://localhost:8080/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message, reply }),
    });

    if (!response.ok) {
      console.log("Error post Chat");
      return;
    }

    const data = await response.json();
    setSentMessage(data);
  } catch (err) {
    console.error("Failed to Post Chat ", err);
  }
};
