import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { User } from "next-auth";
import { Guest } from "../_types/Guest";

if (!process.env.AUTH_GOOGLE_ID) throw new Error("AUTH_GOOGLE_ID is required");
if (!process.env.AUTH_GOOGLE_SECRET)
  throw new Error("AUTH_GOOGLE_SECRET is required");

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingGuest: Guest | null = await getGuest(user.email || "");

        if (!existingGuest && user.email && user.name)
          await createGuest({
            email: user.email,
            full_name: user.name,
            nationality: "",
            country_flag: "",
            national_id: "",
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      if (!session.user) return session;
      const guest = await getGuest(session.user.email ?? "");
      session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
