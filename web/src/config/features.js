// When ADVISOR_ONLY is true, the app shows only the advisor chat:
// - "/" shows Google sign-in, then the full-page advisor chat.
// - src/proxy.js sends all other pages to "/".
// - The PWA install prompt does not show.
// Set it to false to show the full app again. The API routes work in both modes.
export const ADVISOR_ONLY = true;
