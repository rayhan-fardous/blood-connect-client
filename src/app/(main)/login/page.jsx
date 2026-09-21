"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Droplets,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

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
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />
          <Droplets className="w-5 h-5 text-red-600 absolute inset-0 m-auto animate-pulse" />
        </div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-slate-50/70 overflow-hidden px-4 pt-28 pb-16 font-sans selection:bg-red-500/20">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-linear-to-br from-red-200/40 via-rose-100/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-linear-to-bl from-rose-200/30 via-red-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-red-100/30 rounded-full blur-3xl" />
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      {/* Main Dual-Pane Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-[2.2rem] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] grid lg:grid-cols-12 overflow-hidden z-10"
      >
        {/* LEFT COLUMN: Premium LifeSaver Showcase */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 bg-linear-to-br from-red-600 via-rose-600 to-red-700 text-white relative overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />

          {/* Top Branding & Status */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Lifesaver Network</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tight leading-tight text-white">
                Every drop <br />
                ignites hope.
              </h2>
              <p className="text-red-100/90 text-sm leading-relaxed font-normal">
                Log in to coordinate critical blood donations, track live matching requests, and save lives across Bangladesh.
              </p>
            </div>

            {/* Impact Feature Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">100% Verified Donors</h4>
                  <p className="text-[11px] text-red-100/80 leading-snug">
                    Compatibility matched with privacy-protected communication.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Rapid Emergency Dispatch</h4>
                  <p className="text-[11px] text-red-100/80 leading-snug">
                    Average donor connection under 15 minutes in urban hubs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Community Proof Card */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/60 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120"
                  alt="Donor"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/60 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120"
                  alt="Donor"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/60 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120"
                  alt="Donor"
                />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 ring-2 ring-white/60 text-[10px] font-bold text-white">
                  +12k
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">12,500+ Donors</p>
                <p className="text-[10px] text-red-100/80">Ready to respond across 64 districts</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Sign In Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-7">
            {/* Form Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-red-50 text-red-600 border border-red-100 mb-3">
                <Sparkles size={12} />
                <span>Donor & Organization Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Enter your credentials to access your donor dashboard.
              </p>
            </div>

            {/* Social Authentication */}
            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-700 text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-sm active:scale-[0.99] cursor-pointer group"
              >
                <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
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
            </div>

            {/* Modern Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400 uppercase font-medium tracking-wider text-[11px]">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-100"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 text-xs bg-red-50/90 border border-red-200 rounded-xl text-red-700 flex items-center gap-2 font-medium"
                >
                  <AlertCircle size={16} className="shrink-0 text-red-600" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-200 disabled:opacity-60 text-sm cursor-pointer group"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Switch to Register */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Don’t have an authorized account?{" "}
                <Link
                  href="/register"
                  className="text-red-600 font-bold hover:text-red-700 hover:underline transition-colors"
                >
                  Register as a Donor
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust & Security Micro-Footer */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-6 pointer-events-none">
        <ShieldCheck size={14} className="text-slate-400" />
        <span>End-to-End Secure • Encrypted SSL Connection • BloodConnect System</span>
      </div>
    </div>
  );
};

export default LoginPage;