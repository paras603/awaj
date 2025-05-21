import { registerUser } from "../../services/Auth";
import { AuthButton } from "./AuthButton";
import { AuthInputField } from "./AuthInputField";
import { AuthLabel } from "./AuthLabel";
import { useNavigate } from "react-router";
import { saveToken } from "../../auth/tokenService";

export function SignUpForm(){
    const navigate = useNavigate();
    return (
        <form className="space-y-6" 
            action={async (formData) => {
              const response = await registerUser(formData);
              if(response.errors){
                  console.log(response.errors);
              }
              if(response.data){
              const token = response.data.token;

              saveToken(token);

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