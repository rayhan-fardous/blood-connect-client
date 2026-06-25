"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Menu,
  X,
  LogOut,
  FilePlus,
  ClipboardList,
  Users,
  Droplet,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const adminLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/allUsers", label: "All Users", icon: Users },
  { href: "/dashboard/allDonationRequests", label: "All Requests", icon: Droplet },
];

const volunteerLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/allDonationRequests", label: "All Requests", icon: Droplet },
  { href: "/dashboard/create-request", label: "Create Request", icon: FilePlus },
];

const donorLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/create-request", label: "Create Request", icon: FilePlus },
  { href: "/dashboard/requests", label: "My Requests", icon: ClipboardList },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const role = session?.user?.roll?.toLowerCase();
  let sidebarLinks = donorLinks;
  if (role === "admin") sidebarLinks = adminLinks;
  else if (role === "volunteer") sidebarLinks = volunteerLinks;

  const handleLogout = async () => {
    const { authClient } = await import("@/lib/auth-client");
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-50/50 font-sans selection:bg-red-500/20">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-slate-200/80 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:z-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm shadow-red-500/20 group-hover:scale-102 transition-transform">
              <Image
                src={Logo}
                height={22}
                width={22}
                alt="BloodConnect Logo"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-slate-900">
                Blood<span className="text-red-600">Connect</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {role === "admin"
                  ? "Admin Panel"
                  : role === "volunteer"
                    ? "Volunteer Panel"
                    : "Donor Panel"}
              </p>
            </div>
          </Link>
          <button
            className="lg:hidden p-1.5 hover:bg-slate-50 text-slate-500 rounded-lg border border-transparent hover:border-slate-200/60 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-red-50/80 text-red-600 border border-red-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-red-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border border-slate-200 ring-2 ring-red-500/5"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[11px] text-slate-400 truncate font-medium">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50/40 rounded-xl shadow-xs transition-all"
          >
            <LogOut size={14} className="text-slate-400 group-hover:text-red-500 transition-colors" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-50 text-slate-600 border border-slate-200/60 rounded-xl transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-sm text-slate-800 tracking-tight">Dashboard</span>
          <div className="w-9" />
        </header>

        <main
          className="flex-1 flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/LXMbmdZV/Chat-GPT-Image-Jun-25-2026-12-01-18-PM.png')`,
          }}
        >
          <div 
            className="absolute inset-0 bg-linear-to-b from-white/90 via-slate-50/85 to-white/90 mix-blend-normal pointer-events-none"
            style={{ backgroundColor: "rgba(255, 250, 250, 0.75)" }}
          />
          <div className="flex-1 p-4 md:p-8 relative z-10">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}