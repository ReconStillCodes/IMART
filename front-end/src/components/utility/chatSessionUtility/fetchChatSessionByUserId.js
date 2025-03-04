export const fetchChatSessionByUserId = async (
  userId,
  setChatSessions,
  setLoadingChatSession
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/chat-sessions/userId/${userId}`
    );

    if (!response.ok) {
      console.log("Error fetching Chat session By UserId");
      return;
    }

    const data = await response.json();
    setChatSessions(data);
  } catch (err) {
    console.error("Error fetching Chat session By UserId:", err);
  } finally {
    setLoadingChatSession(false);
  }
};
