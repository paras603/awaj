import { registerUser } from "../../services/auth";
import { AuthButton } from "./AuthButton";
import { AuthInputField } from "./AuthInputField";
import { AuthLabel } from "./AuthLabel";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FormError } from "../ui/FormError";

export function SignUpForm(){
    const navigate = useNavigate();
    const {login} = useAuth();

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation] = useState("");

    const [ usernameError, setUsernameError ] = useState("");
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("password_confirmation", passwordConfirmation);

            const response = await registerUser(formData);

            if(response.data){
              const {token, user} = response.data;
              login(user, token);
              navigate('/dashboard')
            }

            if(response.errors){
                console.log(response.errors);
                setUsernameError(response.errors.username);
                setEmailError(response.errors.email);
                setPasswordError(response.errors.password);
                setPassword("");
                setPasswordConfirmation("");
            }
        }finally{

        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
                <AuthLabel
                    labelFor="email"
                    label="Email address"
                />
                <div className="mt-1">
                    <AuthInputField
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                {emailError && <FormError message={emailError} />}
            </div>
            
            <div className="mb-4">
                <AuthLabel
                    labelFor="username"
                    label="Username"
                />
                <div className="mt-1">
                    <AuthInputField
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                {usernameError && <FormError message={usernameError} />}
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <AuthLabel
                        labelFor="password"
                        label="Password"
                    />
                </div>
                <div className="mt-1">
                    <AuthInputField
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <AuthLabel
                        label="Password Confirmation"
                        labelFor="password_confirmation"
                    />
                </div>
                <div className="mt-1">
                    <AuthInputField
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        autoComplete="current-password"
                        value={passwordConfirmation}
                        onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    />
                </div>
                {passwordError && <FormError message={passwordError} />}
            </div>

            <div>
                <AuthButton type="submit">
                    Register
                </AuthButton>
            </div>
        </form>
    );
}