import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Enterprise Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("No account found with this email.");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before logging in.");
          }

          if (!user.password) {
            throw new Error("Account is missing a password. Please contact support.");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid password.");
          }

          // Special hardcoded admin for testing if the DB flag isn't set yet
          if (user.email === "harishrsk@gmail.com" && !user.isAdmin) {
             await prisma.user.update({
                where: { email: user.email },
                data: { isAdmin: true }
             });
             user.isAdmin = true;
          }

          return { id: user.id, email: user.email, isAdmin: user.isAdmin };
        } catch (error: any) {
          console.error("[AUTH_ERROR]", error.message);
          throw new Error(error.message || "Authentication failed.");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-yochan-shield-1234",
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
