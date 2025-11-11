import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const googleProvider = new GoogleAuthProvider();

  // 🔹 Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // simple client-side check (optional)
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPassError("");
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid email or password!");
    }
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 px-4">
      <ToastContainer position="top-center" />
      <div className="relative flex justify-center items-center">
        {/* Floating Bubbles */}
        <div className="absolute top-0 left-0 z-0">
          <div className="bg-purple-600 opacity-50 rounded-full w-48 h-48 animate-pulse"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 z-0">
          <div className="bg-pink-600 opacity-40 rounded-full w-56 h-56 animate-pulse"></div>
        </div>

        {/* Card */}
        <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-xl w-full max-w-md p-8 border border-gray-100 z-10">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            Log In
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Username"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-600 outline-none bg-white/50 backdrop-blur-md"
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passError) setPassError("");
                  }}
                  placeholder="••••••••"
                  className={`w-full border rounded-md px-4 py-2 pr-12 focus:ring-2 outline-none ${passError
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-600"
                    } bg-white/50 backdrop-blur-md`}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-3 flex items-center text-xs text-white hover:text-gray-700"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>

              {passError && (
                <p className="text-red-500 text-sm mt-2">{passError}</p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-md font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center mt-6 mb-4">
            <div className="w-1/5 border-t border-white/30"></div>
            <span className="mx-3 text-white text-sm">or</span>
            <div className="w-1/5 border-t border-white/30"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-indigo-50 transition-all duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Signup link */}
          <p className="text-center text-sm text-white mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
