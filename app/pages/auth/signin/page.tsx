// app/auth/signin/page.tsx
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/lib/authOptions";
import SignInButton from "./SignInButton"; // Import the Client Component
import RegisterButton from "./RegisterButton"; // Import the Client Component
import "./signin.css";
import "./signin-form.css";
import SignInForm from "./SignInform";
export default async function SignIn() {
  const session = await getServerSession(authOptions); // Use authOptions here

  // If the user is already logged in, redirect to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  const providers = await getProviders();

  return (
    <div className="page">
      <div className="signin">
        <div className="card">
          <SignInForm/>
            <hr />
            <div className="credential-signin">
              {providers &&
                Object.values(providers)
                  .filter((provider) => provider.id != "credentials")
                  .map((provider) => (
                    <div key={provider.name} className="submit-button">
                      <SignInButton
                        providerId={provider.id}
                        providerName={provider.name}
                        logoUrl={`https://authjs.dev/img/providers/${provider.id}.svg`} 
                      />{" "}
                    </div>
                  ))}
            </div>
            <div className="register-container">
              <RegisterButton />
            </div>
        </div>
      </div>
    </div>
  );
}
