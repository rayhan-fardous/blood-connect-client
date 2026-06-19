'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const FloatingBloodCell = ({ size, top, left, delay, duration }) => (
  <div
    className="absolute rounded-full bg-red-600/10 blur-3xl pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      animation: `float ${duration} ${delay} infinite ease-in-out`,
      opacity: 0.5,
    }}
  />
);

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup
    ) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    // Base Background matched perfectly with LoginPage + Clearance pt-28 for Navbar.jsx
    <div className="relative min-h-screen flex flex-col justify-between bg-[#0b0f1c] overflow-hidden px-4 pt-28 pb-12 font-sans selection:bg-red-500/30">
      
      {/* Ambient Glow Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingBloodCell size="400px" top="5%" left="-10%" delay="0s" duration="18s" />
        <FloatingBloodCell size="500px" top="65%" left="75%" delay="2s" duration="22s" />
        <FloatingBloodCell size="300px" top="35%" left="50%" delay="4s" duration="15s" />
      </div>

      {/* Main Container - 12 Column Layout Matching LoginPage */}
      <div className="relative w-full max-w-4xl mx-auto my-auto bg-white/2 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] grid lg:grid-cols-12 overflow-hidden z-10">
        
        {/* Left Segment: Brand Showcase (Spans 5 Columns) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-linear-to-b from-red-950/40 via-red-900/20 to-transparent relative border-r border-white/5">
          <div className="space-y-8">
            <div className="w-14 h-14 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl shadow-inner">
              <Droplets size={28} className="text-red-500 drop-shadow" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Join the <br />Movement.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create an account to join thousands of heroes. Every registration helps bridge the vital link between generous donors and lives in need.
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 font-medium tracking-wide">
            &copy; BloodConnect network
          </div>
        </div>

        {/* Right Segment: Sleek Registration Form (Spans 7 Columns) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-zinc-950/20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in your details to register as a donor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@bloodconnect.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </div>

            {/* Password & Confirm Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Blood Group & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-white/3 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0b0f1c] text-gray-600">
                      Select group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group} className="bg-[#0b0f1c] text-white">
                        {group}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Phone <span className="text-gray-600 font-normal normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full pl-11 pr-4 py-3 bg-white/3 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms Consent */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-white/10 bg-white/5 accent-red-600 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-400 leading-normal cursor-pointer select-none">
                I agree to BloodConnect's{' '}
                <Link href="/terms" className="text-gray-300 hover:text-red-400 underline transition-colors">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-gray-300 hover:text-red-400 underline transition-colors">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Error Alert Box */}
            {error && (
              <div className="p-3 text-xs bg-red-950/50 border border-red-500/20 rounded-xl text-red-400 text-center font-medium">
                {error}
              </div>
            )}

            {/* Action Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-red-950/50 transition-all disabled:opacity-50 text-sm group"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : (
                <>
                  Register Account
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Redirection Callout */}
          <p className="text-center text-xs text-gray-400 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-red-400 font-medium hover:underline transition">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Security Spacer Footer */}
      <div className="w-full text-center text-[10px] text-gray-600 mt-4 pointer-events-none opacity-40">
        Secured Registration Connection
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-35px) scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;