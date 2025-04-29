import * as SecureStore from "expo-secure-store";

export async function saveAuthToken(token: string) {
  await SecureStore.setItemAsync("authToken", token);
}

export async function getAuthToken() {
  return await SecureStore.getItemAsync("authToken");
}

export async function clearAuthToken() {
  await SecureStore.deleteItemAsync("authToken");
}

export default {};
