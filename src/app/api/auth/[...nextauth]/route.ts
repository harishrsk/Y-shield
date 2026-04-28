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

          let user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Auto-Registration Logic (for Prototype demo simplicity)
          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                isVerified: true
              },
            });
          } else {
            // Validate existing user password
            if (!user.password) {
              console.error(`[AUTH] User ${credentials.email} found but has no password set.`);
              return null;
            }
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) {
              console.error(`[AUTH] Invalid password for ${credentials.email}`);
              return null;
            }
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("[AUTH_CRITICAL_ERROR]", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-yochan-shield-1234",
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
