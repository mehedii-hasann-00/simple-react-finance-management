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
      // Common Firebase errors:
      // auth/invalid-credential, auth/user-not-found, auth/wrong-password, etc.
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <ToastContainer position="top-center" />
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">
          Login to <span className="italic font-serif">GreenNest</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className={`w-full border rounded-md px-4 py-2 pr-12 focus:ring-2 outline-none ${
                  passError
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-600"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 hover:text-gray-700"
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
              className="text-sm text-green-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white py-3 rounded-md font-medium hover:from-green-600 hover:to-green-400 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 mb-4">
          <div className="w-1/5 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="w-1/5 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-green-50 transition-all duration-300"
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
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-700 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
