import { AuthButton } from "./AuthButton";
import { AuthInputField } from "./AuthInputField";
import { AuthLabel } from "./AuthLabel";

export function SignUpForm(){
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
                        labelFor="password-confirmation"
                    />
                </div>
                <div className="mt-2">
                    <AuthInputField
                        type="password"
                        name="password-confirmation"
                        id="password"
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