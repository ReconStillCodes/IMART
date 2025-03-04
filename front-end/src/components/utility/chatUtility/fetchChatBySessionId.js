export const fetchChatSessionId = async (sessionId, setChats) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/chats/sessionId/${sessionId}`
    );

    if (!response.ok) {
      console.log("Error fetching Chat By Session Id");
      return;
    }

    const data = await response.json();
    setChats(data);
  } catch (err) {
    console.error("Error fetching Chat By SessionId:", err);
  }
};
