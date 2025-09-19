// pages/api/auth/[...nextauth].js (Pages Router)
// or app/api/auth/[...nextauth]/route.ts (App Router)
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "24798591637-mgdelhdj5fb6nptn0m8jtl68rqrafdug.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // Add other providers like FacebookProvider, GitHubProvider, etc.
  ],
  // Optional: Add callbacks for custom logic after sign-in, etc.
});
