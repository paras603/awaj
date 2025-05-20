import { useNavigate } from "react-router";

export function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-5xl font-bold font-serif uppercase text-gray-900">AWAJ</h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your voice. Speak your truth.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <button onClick={() => navigate('/signup')} className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>
        <button onClick={() => navigate('/signin')} className="w-full py-3 px-6 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
