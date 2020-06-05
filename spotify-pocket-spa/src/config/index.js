export const config = {
  spotify: {
    authorizationURL: "https://accounts.spotify.com/authorize",
    clientId: "a4fe87a002684f5088a6ecfb64cc0735",
    redirectUrl: `${window.location.origin}/authorize`,
    webAPI: "https://api.spotify.com/v1",
    scopes: ["user-read-email", "user-read-private", "streaming"],
  },
};
