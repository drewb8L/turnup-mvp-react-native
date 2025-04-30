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
    // const login = async () => {
    //   try {
    //     const token = await Storage.getAuthToken();
    //     setToken(token);
    //     const response = await fetch(
    //       `http://192.168.50.119:5111/api/users/auth/login`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({ provider: "google", idToken: token }),
    //       },
    //     );
    //     const data = await response.json();
    //     console.log(data);
    //     setUser(data);
    //   } catch (error) {
    //     console.error("Error fetching user info:", error);
    //   }
    // };
    const getUserInfo = async () => {
      try {
        const token = await Storage.getAuthToken();
        setToken(token);
        const response = await fetch(
          `http://192.168.50.119:5111/api/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setUser(data);
        console.log("User data:", data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    // login();
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
