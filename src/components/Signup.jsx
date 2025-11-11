import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppsContext } from "../AppsContext";

export default function Signup() {
  const { createUser, googleLogin } = useContext(AppsContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passError, setPassError] = useState("");

  // password validation
  const validatePassword = (pwd) => {
    if (!/[A-Z]/.test(pwd)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must include at least one lowercase letter.";
    }
    if (pwd.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const msg = validatePassword(password);
    if (msg) {
      setPassError(msg);
      return;
    }
    setPassError("");

    try {
      await createUser(name, photoURL, email, password);

      toast.success("Account created successfully! 🎉");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Signup failed.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google! ");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 px-4">
      <ToastContainer position="top-center" />

      <div className="relative flex justify-center items-center my-8">
        {/* Floating Bubbles */}
        <div className="absolute top-0 left-0 z-0">
          <div className="bg-purple-600 opacity-50 rounded-full w-48 h-48 animate-pulse"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 z-0">
          <div className="bg-pink-600 opacity-40 rounded-full w-56 h-56 animate-pulse"></div>
        </div>

        {/* Card */}
        <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-xl w-full max-w-md p-8 border border-gray-100 z-10">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            Create Account <span className="italic font-serif">FinEase</span>
          </h2>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-600 outline-none bg-white/50 backdrop-blur-md"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Photo URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-600 outline-none bg-white/50 backdrop-blur-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-600 outline-none bg-white/50 backdrop-blur-md"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="block text-sm font-medium text-white">
                  Password
                </label>
                <span className="text-[11px] text-gray-400 font-medium">
                  (6+ chars, Aa)
                </span>
              </div>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border rounded-md px-4 py-2 focus:ring-2 outline-none ${
                  passError
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-600"
                } bg-white/50 backdrop-blur-md`}
              />
              {passError && (
                <p className="text-red-500 text-sm mt-2">{passError}</p>
              )}
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-md font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center mt-6 mb-4">
            <div className="w-1/5 border-t border-white/30"></div>
            <span className="mx-3 text-white text-sm">or</span>
            <div className="w-1/5 border-t border-white/30"></div>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-indigo-50 transition-all duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-white mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
