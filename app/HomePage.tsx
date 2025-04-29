import React, { useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
      const { authentication } = response;
      console.log("✅ Login Successful!");
      console.log("Access Token:", authentication?.accessToken);
      if (authentication?.accessToken) {
        saveAuthToken(authentication.accessToken)
          .then(() => {
            console.log("Token stored successfully");
            router.push("/dashboard");
          })
          .catch((err) => {
            console.error(`Error storing token ${err}`);
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
