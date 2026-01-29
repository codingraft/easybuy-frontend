import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const Login = () => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [login] = useLoginMutation()

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

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
    <div className="w-full min-h-screen flex items-center justify-center bg-background p-4 lg:p-0">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-card border border-border/50 rounded-2xl overflow-hidden shadow-2xl h-[85vh]">
        {/* Left Side - Image/Brand */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-zinc-900/5"></div>
          {/* Abstract Decor */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-500/10 to-transparent"></div>

          <div className="relative z-10 space-y-6">
            <h1 className="text-5xl font-heading font-bold text-foreground tracking-tight">
              Welcome to <br /> EasyBuy.
            </h1>
            <p className="text-lg text-muted-foreground max-w-sm leading-relaxed">
              Discover a curated shopping experience driven by quality, simplicity, and elegance.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-8 md:p-14 lg:p-20 bg-card">
          <div className="max-w-md w-full mx-auto space-y-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-heading font-bold text-foreground">Sign In</h2>
              <p className="text-muted-foreground mt-2">Enter your details to access your account</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-12 rounded-lg border border-input bg-background px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">Date of Birth</label>
                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full gap-3 py-6 text-base shadow-sm hover:shadow-md transition-all"
                variant="default"
              >
                <BsGoogle className="text-lg" />
                <span>Continue with Google</span>
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground pt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
