import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // We use the same server-side logic as before
        const correctPassword = process.env.ADMIN_PASSWORD || "apnas123";
        
        if (credentials?.password === correctPassword) {
          return { id: "admin", name: "Aswini", email: "admin@apnaswill.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "apnas-secret-key-2026",
  session: {
    strategy: "jwt" as const,
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
