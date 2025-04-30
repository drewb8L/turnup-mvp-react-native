
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Storage from "./utils/storage";

type User = {
  firstName: string;
  email: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await Storage.getAuthToken();
        console.log("Token being sent:", token);
        setToken(token);
        const response = await fetch(
          `http://192.168.50.119:5111/api/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setUser(data);
          console.log("User data:", data);
        } else {
          throw new Error("Expected JSON response");
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    getUserInfo();
  }, []);

  return (
    <View>
      <Text>Dashboard</Text>
      <Text>Welcome to the dashboard, {user?.firstName}</Text>
      <Text>Here you can find all your important information.</Text>
      <Text>Have a great day!</Text>
    </View>
  );
}
