import { useState, useEffect,useContext } from "react";
import { auth } from "../firebase/firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppsContext } from "../AppsContext";
import {
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

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
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">My Profile 
        </h2>

        <div className="flex justify-center mb-6">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="User"
            className="h-24 w-24 rounded-full object-cover border-4 border-green-600 shadow-md"
          />
        </div>

        <div className="space-y-2 mb-8">
          <p className="text-lg font-medium text-gray-800">
            <span className="text-gray-500">Name: </span> {user.displayName || "Not set"}
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="text-gray-500">Email: </span> {user.email}
          </p>
        </div>

        <form
          onSubmit={handleUpdateProfile}
          className="flex flex-col gap-4 text-left"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Display Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Photo URL
            </label>
            <input
              type="text"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white py-3 rounded-md font-medium hover:from-green-600 hover:to-green-400 transition-all duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
