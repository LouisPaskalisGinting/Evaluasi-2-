// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Anda bisa menambahkan callback, database, dll. di sini
  // Misalnya, untuk menyimpan user ke database Anda
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and refresh_token to the JWT token after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, such as an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Mengarahkan ke halaman login kustom Anda
  },
};

export default NextAuth(authOptions);
