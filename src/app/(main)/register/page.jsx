"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  Droplets,
  ChevronDown,
  Upload,
  Camera,
  ShieldCheck,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";
import districtsRaw from "../../../../data/districts.json";
import upazilasRaw from "../../../../data/upazilas.json";
import toast from "react-hot-toast";

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RegisterPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    phone: "",
    district: "",
    upazila: "",
    avatarUrl: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districtsInfo.find(
        (d) => d.name === formData.district
      );
      if (selectedDistrict) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selectedDistrict.id
        );
        setFilteredUpazilas(upazilas);

        if (!upazilas.find((u) => u.name === formData.upazila)) {
          setFormData((prev) => ({ ...prev, upazila: "" }));
        }
      }
    } else {
      setFilteredUpazilas([]);
      setFormData((prev) => ({ ...prev, upazila: "" }));
    }
  }, [formData.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    setAvatarUploading(true);
    const apiKey = "c211465178416005394da28b4b6f0ccf";

    const formPayload = new FormData();
    formPayload.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formPayload,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, avatarUrl: data.data.url }));
        toast.success("Avatar uploaded successfully!");
      } else {
        setError("Avatar upload failed. Please try again.");
        setAvatarPreview(null);
      }
    } catch (err) {
      setError("Avatar upload error. Check your connection.");
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup ||
      !formData.district ||
      !formData.upazila
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        image: formData.avatarUrl,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        phone: formData.phone,
      });

      if (signUpError) {
        setError(signUpError.message || "Registration failed");
        toast.error(signUpError.message || "Registration failed.");
        setLoading(false);
        return;
      }

      toast.success("Registration successful! Please login.");
      router.push("/dashboard");
    } catch (err) {
      console.error("Unexpected error:", err);
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
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-slate-50/70 overflow-hidden px-4 pt-24 pb-16 sm:pt-28 font-sans selection:bg-red-500/20">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-linear-to-br from-red-200/40 via-rose-100/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-linear-to-bl from-rose-200/30 via-red-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      </div>

      {/* Main Dual-Pane Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-[2.2rem] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] grid lg:grid-cols-12 overflow-hidden z-10 my-4"
      >
        {/* LEFT COLUMN: Mission & Donor Community Showcase */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 bg-linear-to-br from-red-600 via-rose-600 to-red-700 text-white relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />

          {/* Top Brand Info */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-white shadow-xs">
              <Sparkles size={13} className="text-amber-300" />
              <span>Join 12,500+ Lifesavers</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tight leading-tight text-white">
                Be the reason <br />
                someone lives.
              </h2>
              <p className="text-red-100/90 text-sm leading-relaxed font-normal">
                Register as a voluntary donor to receive emergency alerts only when compatible patients in your area need you most.
              </p>
            </div>

            {/* Impact Feature Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Privacy Protected</h4>
                  <p className="text-[11px] text-red-100/80 leading-snug">
                    Your phone number is kept private until you confirm a request.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Localized Matching</h4>
                  <p className="text-[11px] text-red-100/80 leading-snug">
                    Smart geospatial dispatch matching your district and upazila.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">100% Free Service</h4>
                  <p className="text-[11px] text-red-100/80 leading-snug">
                    Zero commercialization. Pure humanitarian compassion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative z-10 mt-6 pt-6 border-t border-white/15">
            <p className="text-xs text-red-50 italic leading-relaxed">
              “Receiving a verified alert and helping a patient in Sylhet within 25 minutes was one of the most meaningful days of my life.”
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                O+
              </div>
              <div>
                <p className="text-xs font-bold text-white">Rahim Chowdhury</p>
                <p className="text-[10px] text-red-200">5x Blood Donor • Sylhet</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Streamlined Multi-section Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-xl w-full mx-auto space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-red-50 text-red-600 border border-red-100 mb-2">
                <Droplets size={12} className="text-red-600" />
                <span>Donor Registration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Enter your details to register as a verified donor in Bangladesh.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Modern Avatar Uploader */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-14 h-14 rounded-full border-2 border-dashed border-slate-300 hover:border-red-500 bg-white flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-200 shrink-0 shadow-xs"
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera
                      size={20}
                      className="text-slate-400 group-hover:text-red-500 group-hover:scale-110 transition-all"
                    />
                  )}

                  {avatarUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={avatarUploading}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={avatarUploading}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Upload size={13} />
                      {avatarUploading ? "Uploading to secure storage..." : avatarPreview ? "Change Photo" : "Upload Profile Photo"}
                    </button>
                    <span className="text-[10px] text-slate-400 font-medium">(Optional)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    JPG or PNG recommended. Max 5MB.
                  </p>
                </div>
              </div>

              {/* SECTION 1: Personal Credentials */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                    1. Account Credentials
                  </span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <User
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Dr. John Doe"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Blood & Location Information */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                    2. Blood Group & Location
                  </span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Blood Group */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Droplets
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none"
                      />
                      <select
                        name="bloodGroup"
                        required
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full appearance-none pl-10 pr-9 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all cursor-pointer shadow-xs font-medium"
                      >
                        <option value="" disabled className="text-slate-400 bg-white">
                          Select Blood Group
                        </option>
                        {bloodGroups.map((group) => (
                          <option key={group} value={group} className="text-slate-900 bg-white font-semibold">
                            {group}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative group">
                      <Phone
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* District */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      District <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <MapPin
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <select
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full appearance-none pl-10 pr-9 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all cursor-pointer shadow-xs"
                      >
                        <option value="" disabled className="text-slate-400 bg-white">
                          Select District
                        </option>
                        {districtsInfo.map((district) => (
                          <option key={district.id} value={district.name} className="text-slate-900 bg-white">
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Upazila */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Upazila <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <MapPin
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors pointer-events-none"
                      />
                      <select
                        name="upazila"
                        required
                        value={formData.upazila}
                        onChange={handleChange}
                        disabled={!formData.district}
                        className="w-full appearance-none pl-10 pr-9 py-2.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                      >
                        <option value="" disabled className="text-slate-400 bg-white">
                          {formData.district ? "Select Upazila" : "Select District first"}
                        </option>
                        {filteredUpazilas.map((upazila) => (
                          <option key={upazila.id} value={upazila.name} className="text-slate-900 bg-white">
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 bg-slate-50 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600 shrink-0"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-slate-500 leading-normal cursor-pointer select-none"
                >
                  I agree to BloodConnect's{" "}
                  <Link
                    href="/terms"
                    className="text-slate-700 hover:text-red-600 font-semibold underline transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-slate-700 hover:text-red-600 font-semibold underline transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Error Banner */}
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

              {/* Submit Button */}
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
                    <span>Creating your profile...</span>
                  </div>
                ) : (
                  <>
                    <span>Register as a Donor</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Switch to Login */}
            <div className="text-center pt-1">
              <p className="text-xs text-slate-500">
                Already registered with BloodConnect?{" "}
                <Link
                  href="/login"
                  className="text-red-600 font-bold hover:text-red-700 hover:underline transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust & Security Micro-Footer */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-4 pointer-events-none">
        <ShieldCheck size={14} className="text-slate-400" />
        <span>End-to-End Secure • Voluntary Donor Network Bangladesh</span>
      </div>
    </div>
  );
};

export default RegisterPage;