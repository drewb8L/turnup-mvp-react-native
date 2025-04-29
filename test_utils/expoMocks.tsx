if (__DEV__ && typeof jest !== "undefined") {
  jest.mock("expo-auth-session", () => ({
    ...jest.requireActual("expo-auth-session"),
    startAsync: jest.fn(),
    makeRedirectUri: jest.fn(() => "mocked-redirect-uri"),
    useAuthRequest: jest.fn(() => [{}, {}, jest.fn()]),
    ResponseType: {
      Code: "code",
      Token: "token",
      IdToken: "id_token",
    },
    TokenResponse: class {},
    AuthRequest: class {},
    DiscoveryDocument: {},
    AuthSessionResultType: {
      Success: "success",
      Error: "error",
      Dismiss: "dismiss",
    },
    getAuthRequestConfig: jest.fn(),
    getRedirectUrl: jest.fn(() => "mocked-redirect-url"),
    fetchDiscoveryAsync: jest.fn(),
    fetchAuthRequestConfigAsync: jest.fn(),
    fetchTokenResponseAsync: jest.fn(),
    makeAuthUrlAsync: jest.fn(),
    refreshAsync: jest.fn(),
    revokeAsync: jest.fn(),
    getDefaultReturnUrl: jest.fn(),
    getStartUrlAsync: jest.fn(),
    maybeCompleteAuthSession: jest.fn(),
    createRequest: jest.fn(),
    createURL: jest.fn(),
    openAuthSessionAsync: jest.fn(),
    dismissAuthSession: jest.fn(),
    redirectUriForRequest: jest.fn(),
    AuthSession: {
      maybeCompleteAuthSession: jest.fn(),
    },
    Standalone: {}, // 👈 **THIS** will fix your Standalone undefined error
  }));

  jest.mock("expo-auth-session/providers/google", () => ({
    useAuthRequest: jest.fn(() => [{}, {}, jest.fn()]),
  }));

  jest.mock("expo-linking", () => ({
    createURL: () => "mocked-url",
    makeUrl: () => "mocked-url",
  }));

  jest.mock("expo-constants", () => ({
    manifest: {
      scheme: "mock-scheme",
    },
  }));

  jest.mock("expo-router", () => ({
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    },
  }));
}
