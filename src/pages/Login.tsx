import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [login] = useLoginMutation()

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // const token = await user.getIdToken(); // Get secure Firebase token
  
      // Store token in cookies (frontend approach)
      // document.cookie = `authToken=${token}; path=/; max-age=604800; Secure; SameSite=Strict`;
  
      
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        image: user.photoURL!,
        gender,
        role: "user",
        dob,
        _id: user.uid,
      });
  
      if ("data" in res) {
        if (res.data) {
          toast.success(res.data.message);
        }
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign In Failed");
      console.log(error);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h2>
      <form>
        <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Gender:
          <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-2 p-3 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          </select>
        </label>
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Date of Birth:
          <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-2 p-3 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
        </div>
        <p className="text-lg text-gray-600 mb-6 text-center">
        Already have an account? Login below
        </p>
        <button
        type="button"
        onClick={() => handleGoogleLogin()}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
        <BsGoogle className="mr-2 text-xl" /> Login with Google
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
