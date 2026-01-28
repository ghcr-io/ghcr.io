import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const { user } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {user ? (
          <p>Welcome, {user.displayName}</p>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
