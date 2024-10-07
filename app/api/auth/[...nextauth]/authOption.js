import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connect from "@/utils/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connect();
          const userExists = await User.findOne({ email: user.email });

          if (!userExists) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user?.image,
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
        const userExists = await User.findOne({ email: token?.user?.email });

        if (userExists) {
          session.user = {
            authUser: token.user,
            user: userExists,
          };
          return session.user;
        } else {
          session.user = { user: token.user };
          return session.user;
        }
      }
      return session.user;
    },
  },
};
