// app/(dashboardLayout)/dashboard/page.jsx
"use client";

import { useState } from "react";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import DonorDashboard from "@/components/Dashboard/DonorDashboard";
import VolunteerDashboard from "@/components/Dashboard/VolunteerDashboard";
import { useSession } from "@/lib/auth-client";

import { Droplet } from "lucide-react";

export default function DashboardHome() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
            <Droplet
              size={24}
              className="absolute inset-0 m-auto text-red-600 animate-pulse"
            />
          </div>
          <p className="text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user)
    return <p className="text-center py-12 text-gray-500">Please log in.</p>;

  const role = user.roll?.toLowerCase();

  switch (role) {
    case "donor":
      return <DonorDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "volunteer":
      return <VolunteerDashboard />;
    default:
      return <p className="text-center py-12 text-gray-500">Unknown role</p>;
  }
}
