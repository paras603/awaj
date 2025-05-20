import { AuthFooter } from "../components/auth/AuthFooter";
import { SignInForm } from "../components/auth/SignInForm";
import { AuthLayout } from "../components/layouts/AuthLayout";

export function SignIn(){
    return (
      <AuthLayout title="Log in to your account">
        <SignInForm/>
        <AuthFooter 
          text="Not a member?"
          linkText="Register Now!"
          linkHref="/signup"
        />
      </AuthLayout>
    )
}