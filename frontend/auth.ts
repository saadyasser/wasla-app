import { loginViaApi } from "./src/actions/login.action"
import NextAuth from "next-auth"
import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
   
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined
        if (!email || !password) return null

        const res = await loginViaApi({ email, password })
        const user = res.user
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: res.accessToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | null }) {
      type Augmented = JWT & { role?: string; accessToken?: string }
      const t = token as Augmented
      if (user) {
        const u = user as unknown as { role?: string; accessToken?: string }
        t.role = u.role
        t.accessToken = u.accessToken
      }
      return t
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      type Augmented = JWT & { role?: string; accessToken?: string }
      const t = token as Augmented
      const s = session as Session & { user?: Session["user"] & { role?: string }; accessToken?: string }
      if (s.user) {
        s.user.role = t.role
      }
      s.accessToken = t.accessToken
      return s
    },
  },
})