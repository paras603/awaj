import { AuthFooter } from "../components/auth/AuthFooter";
import { SignUpForm } from "../components/auth/SignUpForm";
import { AuthLayout } from "../components/layouts/AuthLayout";

export function SignUp(){
    return (
      <AuthLayout title="Sign in to your account">
        <SignUpForm/>
        <AuthFooter
          text="Already Registerd?"
          linkHref="#"
          linkText="Sign In!"
        />
      </AuthLayout>
    )
}