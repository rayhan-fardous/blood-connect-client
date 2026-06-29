"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Droplets } from "lucide-react";
import { authClient, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const FloatingBloodCell = ({ size, top, left, delay, duration }) => (
  <div
    className="absolute rounded-full bg-red-500/5 blur-3xl pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      animation: `float ${duration} ${delay} infinite ease-in-out`,
      opacity: 0.6,
    }}
  />
);

const LoginPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  } catch (err) {
    console.error(err);
    toast.error("Google sign in failed");
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password.");
        toast.error(signInError.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 overflow-hidden px-4 pt-28 pb-12">
      <div className="absolute inset-0 pointer-events-none">
        <FloatingBloodCell
          size="400px"
          top="5%"
          left="-10%"
          delay="0s"
          duration="18s"
        />
        <FloatingBloodCell
          size="500px"
          top="65%"
          left="75%"
          delay="2s"
          duration="22s"
        />
        <FloatingBloodCell
          size="300px"
          top="35%"
          left="50%"
          delay="4s"
          duration="15s"
        />
      </div>

      <div className="relative w-full max-w-4xl mx-auto my-auto bg-white border border-slate-200/80 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] grid lg:grid-cols-12 overflow-hidden z-10">
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-linear-to-b from-red-50 to-transparent relative border-r border-slate-100">
          <div className="space-y-8">
            <div className="w-14 h-14 flex items-center justify-center bg-red-50 border border-red-100 rounded-2xl shadow-xs">
              <Droplets size={28} className="text-red-600 drop-shadow-xs" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering <br />
                Lifesavers.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Log in to coordinate urgent donation requests, check funding
                milestones, and manage your bridge to saving lives.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium tracking-wide">
            &copy; BloodConnect network
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Please sign in to your dashboard console.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  Remember session
                </label>
                <Link
                  href="/forgot-password"
                  className="text-slate-600 hover:text-red-600 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 rounded-xl text-red-600 text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl shadow-md shadow-red-600/10 transition-all disabled:opacity-50 text-sm group"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400">
                  Third-party authentication
                </span>
              </div>
            </div>

            <button type="button"
  onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition text-sm font-medium shadow-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-xs text-slate-500 mt-4">
              Don’t have an authorized credential?{" "}
              <Link
                href="/register"
                className="text-red-600 font-semibold hover:underline transition"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-[10px] text-slate-400 mt-4 pointer-events-none opacity-60">
        Secured Endpoint Connection
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-35px) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;