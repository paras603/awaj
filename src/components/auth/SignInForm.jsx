import { AuthLabel } from "./AuthLabel";
import { AuthInputField } from "./AuthInputField";
import { AuthLink } from "./AuthLink";
import { AuthButton } from "./AuthButton";
import { loginUser } from "../../services/auth";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FormError } from "../ui/FormError";
import { toast, ToastContainer } from "react-toastify";

export function SignInForm(){

    const navigate = useNavigate();
    const {login} = useAuth();

    const [ emailError, setEmailError ] = useState(null);
    const [ passwordError, setPasswordError ] = useState(null);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      setEmailError("");
      setPasswordError("");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await loginUser(formData);
      
      if(response.data){
        const {token, user} = response.data;
        login(user, token);
        console.log(response.data)
        navigate('/dashboard')
      }

      if(response.errors){
        setPassword("");
        setEmailError(response.errors.email);
        setPasswordError(response.errors.password);
        return;
      }

      toast.error(response.message)
      setEmail("")
      setPassword("")

    }

    return (
      <>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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
              <div className="text-sm" onClick={()=> toast.info("feature coming soon")}>
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
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {passwordError && <FormError message={passwordError} /> }
            </div>
          </div>

          <AuthButton>Sign In</AuthButton>
        </form>
        <ToastContainer/>
      </>
    );                                
}