import { registerUser } from "../../services/auth";
import { AuthButton } from "./AuthButton";
import { AuthInputField } from "./AuthInputField";
import { AuthLabel } from "./AuthLabel";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export function SignUpForm(){
    const navigate = useNavigate();
    const {login} = useAuth();
    return (
        <form className="space-y-6" 
            action={async (formData) => {
              const response = await registerUser(formData);
              if(response.errors){
                  console.log(response.errors);
              }
              if(response.data){
              const {token, user} = response.data;
              login(user, token);

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
                        autocomplete="email"
                        required={true}
                    />
                </div>
            </div>
            
            <div>
                <AuthLabel
                    labelFor="username"
                    label="Username"
                />
                <div className="mt-2">
                    <AuthInputField
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
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

            <div>
                <div className="flex items-center justify-between">
                    <AuthLabel
                        label="Password Confirmation"
                        labelFor="password_confirmation"
                    />
                </div>
                <div className="mt-2">
                    <AuthInputField
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        autoComplete="current-password"
                        required={true}
                    />
                </div>
            </div>

            <div>
                <AuthButton type="submit">
                    Register
                </AuthButton>
            </div>
        </form>
    );
}