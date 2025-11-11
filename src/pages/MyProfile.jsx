import { useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppsContext } from "../AppsContext";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function MyProfile() {
  const { user, setUser } = useContext(AppsContext);

  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setNewName(currentUser.displayName || "");
        setNewPhoto(currentUser.photoURL || "");
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newPhoto,
      });
      toast.success("Profile updated successfully!");
      setUser({ ...auth.currentUser });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 py-16 px-6">
      <ToastContainer />
      <div className="relative max-w-xl mx-auto bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <h2 className="text-3xl font-semibold text-white mb-6">My Profile</h2>

        {/* User Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="User"
            className="h-24 w-24 rounded-full object-cover border-4 border-green-600 shadow-md"
          />
        </div>

        {/* User Info */}
        <div className="space-y-2 mb-8">
          <p className="text-lg font-medium text-white">
            <span className="text-black">Name: </span > {user.displayName || "Not set"}
          </p>
          <p className="text-lg font-medium text-white">
            <span className="text-black">Email: </span> {user.email}
          </p>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">New Display Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              className="text-black w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-600 outline-none bg-white/50 backdrop-blur-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">New Photo URL</label>
            <input
              type="text"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              placeholder="Enter image URL"
              className="text-black w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-600 outline-none bg-white/50 backdrop-blur-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-md font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
