import React, { useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import { saveAuthToken } from "@/utils/storage";

function HomePage() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "669234385237-o1f57ihnr55c5ko03dapco5nugs0josk.apps.googleusercontent.com",
    iosClientId:
      "669234385237-l6i1ruffjfgrf2ik5s5k7c0vj7bbsklv.apps.googleusercontent.com",
    androidClientId:
      "669234385237-084rk8i8k3q9vp1jkpu6uovqrfbssmdf.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      native: "com.drewb.turnupmvprn:/oauthredirect",
    }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.params.id_token;

      if (idToken) {
        fetch(`http://192.168.50.119:5111/api/users/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: "google",
            idToken,
            firstName: response.params.given_name,
          }),
        })
          .then(async (response) => {
            const text = await response.text();
            try {
              const data = JSON.parse(text);
              if (data.token) {
                await saveAuthToken(data.token);
                console.log("Backend token stored successfully");

                router.push("/dashboard");
              } else {
                console.error("No token found in response:", data);
              }
            } catch (e) {
              console.error(`Failed to parse response: ${text}`);
            }
          })
          .catch((error) => {
            console.error("Error storing token:", error);
          });
      }
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        Sign in to get started
      </Text>
      <Button
        title={"Sign in with Google"}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

export default HomePage;
