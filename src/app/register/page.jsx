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
  Image as ImageIcon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import districtsRaw from "../../../data/districts.json";
import upazilasRaw from "../../../data/upazilas.json";

import toast from "react-hot-toast";

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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

const RegisterPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

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
  const [focusedField, setFocusedField] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (formData.district) {
      const selectedDistrict = districtsInfo.find(
        (d) => d.name === formData.district,
      );
      if (selectedDistrict) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selectedDistrict.id,
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

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-slate-50 overflow-hidden px-4 pt-28 pb-12 font-sans selection:bg-red-500/30">
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
                Join the <br />
                Movement.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Create an account to join thousands of heroes. Every
                registration helps bridge the vital link between generous donors
                and lives in need.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium tracking-wide">
            &copy; BloodConnect network
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Fill in your details to register as a donor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2 ml-1 tracking-wide uppercase">
                Avatar (optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-slate-200 bg-slate-50/60 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-red-500/50 transition-colors">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={24}
                      className="text-slate-400 group-hover:text-red-500 transition-colors"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={avatarUploading}
                  />
                </div>
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
                    disabled={avatarUploading}
                  >
                    <Upload size={14} />
                    {avatarUploading ? "Uploading..." : "Choose Image"}
                  </button>
                  <p className="text-[10px] text-slate-400 mt-1">
                    JPG, PNG, up to 5MB
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "name" ? "text-red-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  name="fullName"
                  required
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === "email" ? "text-red-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@bloodconnect.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "pass" ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    onFocus={() => setFocusedField("pass")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-990 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "cpass" ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    onFocus={() => setFocusedField("cpass")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    name="bloodGroup"
                    required
                    onFocus={() => setFocusedField("blood")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all cursor-pointer shadow-inner-sm"
                  >
                    <option value="" disabled className="text-slate-400 bg-white">
                      Select group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group} className="text-slate-900 bg-white">
                        {group}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "blood" ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 ml-1 tracking-wide uppercase">
                  District
                </label>
                <div className="relative">
                  <select
                    name="district"
                    required
                    onFocus={() => setFocusedField("district")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all cursor-pointer shadow-inner-sm"
                  >
                    <option value="" disabled className="text-slate-400 bg-white">
                      Select district
                    </option>
                    {districtsInfo.map((district) => (
                      <option key={district.id} value={district.name} className="text-slate-900 bg-white">
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "district" ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 ml-1 tracking-wide uppercase">
                  Upazila
                </label>
                <div className="relative">
                  <select
                    name="upazila"
                    required
                    onFocus={() => setFocusedField("upazila")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.upazila}
                    onChange={handleChange}
                    disabled={!formData.district}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-inner-sm"
                  >
                    <option value="" disabled className="text-slate-400 bg-white">
                      Select upazila
                    </option>
                    {filteredUpazilas.map((upazila) => (
                      <option key={upazila.id} value={upazila.name} className="text-slate-900 bg-white">
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
                      focusedField === "upazila" ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Phone{" "}
                  <span className="text-slate-400 font-normal normal-case">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "phone" ? "text-red-500" : "text-slate-400"
                    }`}
                  />
                  <input
                    type="text"
                    name="phone"
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all shadow-inner-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 bg-slate-50 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-slate-500 leading-normal cursor-pointer select-none"
              >
                I agree to BloodConnect's{" "}
                <Link
                  href="/terms"
                  className="text-slate-700 hover:text-red-600 font-medium underline transition-colors"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-slate-700 hover:text-red-600 font-medium underline transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </label>
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
                  Register Account
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-red-600 font-semibold hover:underline transition"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full text-center text-[10px] text-slate-400 mt-4 pointer-events-none opacity-60">
        Secured Registration Connection
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

export default RegisterPage;