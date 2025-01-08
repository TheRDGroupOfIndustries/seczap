import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      if (account.provider === "google") {
        try {
          await connect();
          const userExists = await User.findOne({ email: user.email });

          if (!userExists) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user?.image,
              integrationsAuth: ["google"],
            });
            const savedUser = await newUser.save();
            return savedUser;
          }
          return userExists;
        } catch (error) {
          console.log("Error storing onto the db : ", error);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      await connect();
      if (typeof token?.user !== "undefined") {
        const userExists = await User.findOne({
          email: token?.user?.email,
        }).select("-password");

        if (userExists) {
          session.user = userExists;
          return session;
        } else {
          session.user = token?.user;
          return session;
        }
      }
      return session;
    },
  },
};
