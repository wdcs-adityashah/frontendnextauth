import NextAuth, { AuthOptions, User as NextAuthUser , Account, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/config/db";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
interface CustomProfile extends Profile {
  email_verified?: boolean; // Add this property if it exists in your setup
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }
      
        await connectDB();
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
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    TwitterProvider({
      clientId:process.env.TWITTER_CONSUMER_KEY as string,
      clientSecret:process.env.TWITTER_CONSUMER_SECRET as string,
    }),
    GithubProvider({
      clientId:process.env.GITHUB_ID as string,
      clientSecret:process.env.GITHUB_SECRET as string,
    })
  ],

  callbacks: {
    async signIn({ account, error }: { account: Account | null; error: Error }) {
      console.log('Account:', account);

      if (account?.provider === "google") {
        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      }
      if(account?.provider === "github"){
        return true;

      }
      if (account?.provider === "twitter") {
        if (error) {
          console.log("Twitter sign in error:", error); // Log the error object
          return false; // Return false to indicate sign-in failure
        }
        return true;
      }
      return false;
    },
    async callbackUrl({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log('Callback URL:', url, baseUrl);
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user, account, profile}: {
      token: any;
      user: NextAuthUser   ;
      account: Account | null;
      profile?: Profile;
    }) {
      // Persist the user ID to the token right after signin
      if (account?.provider === "twitter") {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: {
      session: any;
      token: any;
    }) {
      // Send properties to the client, like an access token from a provider.
      session.user.id = token.id;
      return session;
    },
    async signOut({ session, token }: {
      session: any;
      token: any;
    }) {
      // You can add custom logic here
      return true;
    },
    async signInError({ error, query }: {
      error: any;
      query: any;
    }) {
      if (error.status === 401) {
        // Return an error message to display on the login page
        return '/api/auth/error?error=InvalidUser  Password'
      }
      // Return an error message to display on the login page
      return '/api/auth/error'
    }
  },
debug: true,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };