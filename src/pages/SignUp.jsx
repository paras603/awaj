import { AuthFooter } from "../components/auth/AuthFooter";
import { SignUpForm } from "../components/auth/SignUpForm";
import { AuthLayout } from "../components/layouts/AuthLayout";

export function SignUp(){
    return (
      <AuthLayout title="Become a member">
        <SignUpForm/>
        <AuthFooter
          text="Already Registerd?"
          linkHref="/signin"
          linkText="Sign In!"
        />
      </AuthLayout>
    )
}