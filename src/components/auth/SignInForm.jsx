import { AuthLabel } from "./AuthLabel";
import { AuthInputField } from "./AuthInputField";
import { AuthLink } from "./AuthLink";
import { AuthButton } from "./AuthButton";

export function SignInForm(){
    return (
        <form className="space-y-6" action="#" method="POST">
          <div>
            <AuthLabel
              labelFor="email"
              label="Email address"
            />
            <div className="mt-2">
              <AuthInputField
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required={true}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <AuthLabel
                labelFor="password"
                label="Password"
              />
              <div className="text-sm">
                <AuthLink
                  href="#"
                  linkText="Forgot password?"
                />
              </div>
            </div>
            <div className="mt-2">
              <AuthInputField
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required={true}
              />
            </div>
          </div>

          <AuthButton>Sign In</AuthButton>
        </form>
    );
}