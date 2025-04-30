import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react-native";
import HomePage from "@/HomePage";
import * as GoogleAuthSession from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";

jest.mock("expo-auth-session/providers/google");
jest.mock("expo-auth-session");
jest.mock("expo-secure-store");

describe("Authentication Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();

    (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);
  });

  it("renders login button", async () => {
    (GoogleAuthSession.useAuthRequest as jest.Mock).mockReturnValue([
      {}, // request
      {}, // response (empty during initial render)
      jest.fn(),
    ]);

    render(<HomePage />);
    const button = await screen.findByText(/sign in with google/i);
    expect(button).toBeTruthy();
  });

  it("successfully logs in and stores token", async () => {
    (GoogleAuthSession.useAuthRequest as jest.Mock).mockReturnValue([
      {}, // request
      { type: "success", params: { id_token: "mock-token" } },
      jest.fn(() =>
        Promise.resolve({
          type: "success",
          params: { id_token: "mock-token" },
        }),
      ),
    ]);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () =>
          Promise.resolve(
            JSON.stringify({
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c,
            },
          ,
      },
    );

    render(<HomePage />);
    const button = await screen.findByText(/sign in with google/i);

    await act(async () => {
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "authToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );
    });
  });

  it("handles login cancellation gracefully", async () => {
    (GoogleAuthSession.useAuthRequest as jest.Mock).mockReturnValue([
      {}, // request
      { type: "cancel" },
      jest.fn(() => Promise.resolve({ type: "cancel" })),
    ]);

    render(<HomePage />);
    const button = await screen.findByText(/sign in with google/i);

    await act(async () => {
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
    });
  });
});
