// app/dashboard/layout.js
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
  Activity,
  FilePlus,
  ClipboardList,
  Users,
  Droplet,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import Image from "next/image";

// Sidebar links based on roles
const adminLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/all-users', label: 'All Users', icon: Users },
  { href: '/dashboard/all-requests', label: 'All Requests', icon: Droplet },
];

const volunteerLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: '/dashboard/all-requests', label: 'All Requests', icon: Droplet },
  {
    href: "/dashboard/create-request",
    label: "Create Request",
    icon: FilePlus,
  },
];

const donorLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  {
    href: '/dashboard/create-request',
    label: 'Create Request',
    icon: FilePlus,
  },
  { href: '/dashboard/requests', label: 'My Requests', icon: ClipboardList },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  // Determine sidebar links based on role
  const role = session?.user?.roll?.toLowerCase();
  let sidebarLinks = donorLinks; // default
  if (role === 'admin') sidebarLinks = adminLinks;
  else if (role === 'volunteer') sidebarLinks = volunteerLinks;

  const handleLogout = async () => {
    const { authClient } = await import("@/lib/auth-client");
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:z-auto flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Brand */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 mt-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
              <Image
                src={Logo}
                height={22}
                width={22}
                alt="BloodBridge Logo"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-gray-800">
                Blood<span className="text-red-600">Connect</span>
              </h1>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {role === 'admin'
                  ? 'Admin Panel'
                  : role === 'volunteer'
                    ? 'Volunteer Panel'
                    : 'Donor Panel'}
              </p>
            </div>
          </Link>
          <button
            className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {volunteerLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-red-50 text-red-600 shadow-sm border border-red-100"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-gray-100 p-4 ">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-red-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area (full width after sidebar) */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg text-gray-800">Dashboard</span>
          <div className="w-8" /> {/* spacer */}
        </header>

        {/* Page content (fills available space, pushes footer down) */}
        <main
          className="flex-1 flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/8LW6kpVZ/32392668552.jpg')`,
            backgroundBlendMode: "soft-light",
            backgroundColor: "rgba(255, 240, 240, 0.65)",
          }}
        >
          {/* Children wrapped in centered container */}
          <div className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
