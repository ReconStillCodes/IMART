import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FetchUserData = (sessionKey) => {
  const [sessionData, setSessionData] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem(sessionKey);
    if (session) {
      setSessionData(JSON.parse(session));
    }
  }, [navigate, sessionKey]);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionData) {
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

          const userData = await response.json();
          setUserData(userData);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [sessionData]);

  return userData;
};

export default FetchUserData;
