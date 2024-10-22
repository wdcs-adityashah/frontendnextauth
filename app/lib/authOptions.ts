import { AuthOptions, User as NextAuthUser, Account, Session as DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/config/db";

interface AuthUser extends NextAuthUser {
  id: string; // Assuming you have an id field in your User model
}

// Extend the Session type to include user.id
interface CustomSession extends DefaultSession {
    user: {
      id: string; // Add the id property here
    } & DefaultSession["user"]; // Ensure we preserve the existing user structure
  }
    
const authOptions: AuthOptions = {
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
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<AuthUser | null> {
        // Check if credentials are provided
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credentials are required");
        }
        await connectDB(); // Connect to your database

        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return { ...user.toObject(), id: user._id }; // Return user object with id
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error during authorization:", error);
            throw new Error(error.message);
          }
        }
        throw new Error("Invalid credentials");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY as string,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET as string,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: (profile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],

  pages: {
    signIn: '/pages/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account }: { account: Account | null }) {
      if (account) {
        // Example usage: Log the account information
        console.log("Account details:", account);
        // Add your logic based on account details here
      }
      return true; // Continue with sign-in
  
    },
    async jwt({ token, user }: { token: JWT; user?: AuthUser | null }) {
      if (user) {
        token.id = user.id; // Ensure `user` has an `id` property
      }
      return token;
    },
    
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
        // Create a new CustomSession that includes the user ID
        const customSession: CustomSession = {
          ...session,
          user: {
            ...session.user,
            id: token.id as string, // Assign the ID from the token
          },
        };
        return customSession;
      },
  
  
  },
  debug: true,
};

export default authOptions;
