import { AuthLabel } from "./AuthLabel";
import { AuthInputField } from "./AuthInputField";
import { AuthLink } from "./AuthLink";
import { AuthButton } from "./AuthButton";
import { loginUser } from "../../services/auth";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FormError } from "../ui/FormError";

export function SignInForm(){

    const navigate = useNavigate();
    const {login} = useAuth();

    const [ emailError, setEmailError ] = useState(null);
    const [ passwordError, setPasswordError ] = useState(null);

    return (
        <form className="space-y-6" 
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            const response = await loginUser(formData);

            if(response.errors){
              console.log('response where error: ', response.errors);
              setEmailError(response.errors.email);
              setPasswordError(response.errors.password);
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
              />
              { emailError && <FormError message={emailError} /> }
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
              />
              {passwordError && <FormError message={passwordError} /> }
            </div>
          </div>

          <AuthButton>Sign In</AuthButton>
        </form>
    );
}