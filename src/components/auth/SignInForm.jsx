import { AuthLabel } from "./AuthLabel";
import { AuthInputField } from "./AuthInputField";
import { AuthLink } from "./AuthLink";
import { AuthButton } from "./AuthButton";
import { loginUser } from "../../services/auth";
import { useNavigate } from "react-router";
import { saveToken } from "../../auth/tokenService";
import { useAuth } from "../../context/AuthContext";

export function SignInForm(){

    const navigate = useNavigate();
    const {login} = useAuth();

    return (
        <form className="space-y-6" 
          action={async (formData) => {
            const response = await loginUser(formData);
            if(response.errors){
              console.log(errors);
            }
            if(response.data){
              const {token, user} = response.data;
              login(user, token);
              console.log(response.data)
              navigate('/dashboard')
            }
          }}
        >
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