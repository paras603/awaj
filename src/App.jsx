import { useNavigate } from "react-router";
import { SignIn } from "./pages/SignIn";
import { SignInForm } from "./components/auth/SignInForm";
import { AuthButton } from "./components/auth/AuthButton";
import { AuthFooter } from "./components/auth/AuthFooter";

export function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-x-8 text-center">
        <div>
          <h1 className="text-5xl font-bold font-serif uppercase text-gray-900">AWAJ</h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your voice. Speak your truth.
          </p>
        </div>
      </div>
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <SignInForm/>
        <AuthFooter 
          text="Not a member?"
          linkText="Register Now!"
          linkHref="/signup"
        />
      </div>
    </div>
  );
}

export default App;
