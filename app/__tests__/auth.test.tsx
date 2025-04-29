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
      { type: "success", authentication: { accessToken: "mock-token" } },
      jest.fn(() =>
        Promise.resolve({
          type: "success",
          authentication: { accessToken: "mock-token" },
        }),
      ),
    ]);

    render(<HomePage />);
    const button = await screen.findByText(/sign in with google/i);

    await act(async () => {
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "authToken",
        "mock-token",
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
