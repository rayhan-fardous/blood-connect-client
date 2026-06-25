'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';
import {
  User,
  Mail,
  MapPin,
  Droplet,
  Camera,
  Loader2,
  Save,
  Pencil,
  ChevronDown,
} from 'lucide-react';
import districtsRaw from '../../../../../data/districts.json';
import upazilasRaw from '../../../../../data/upazilas.json';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function ProfilePage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatarUrl: user?.image || '',
    bloodGroup: user?.bloodGroup || '',
    district: user?.district || '',
    upazila: user?.upazila || '',
  });
  const [originalProfile, setOriginalProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fetchingProfile, setFetchingProfile] = useState(true); 
  const fileInputRef = useRef(null);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    if (!user.bloodGroup || !user.district || !user.upazila) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const p = data.profile;
            setProfile({
              name: p.name || user.name || '',
              email: p.email || user.email || '',
              avatarUrl: p.avatarUrl || user.image || '',
              bloodGroup: p.bloodGroup || '',
              district: p.district || '',
              upazila: p.upazila || '',
            });
            setOriginalProfile({
              name: p.name || user.name || '',
              email: p.email || user.email || '',
              avatarUrl: p.avatarUrl || user.image || '',
              bloodGroup: p.bloodGroup || '',
              district: p.district || '',
              upazila: p.upazila || '',
            });
          } else {
            setOriginalProfile({ ...profile });
          }
          setFetchingProfile(false);
        })
        .catch(() => {
          setOriginalProfile({ ...profile });
          setFetchingProfile(false);
        });
    } else {
      setOriginalProfile({
        name: user.name || '',
        email: user.email || '',
        avatarUrl: user.image || '',
        bloodGroup: user.bloodGroup || '',
        district: user.district || '',
        upazila: user.upazila || '',
      });
      setProfile({
        name: user.name || '',
        email: user.email || '',
        avatarUrl: user.image || '',
        bloodGroup: user.bloodGroup || '',
        district: user.district || '',
        upazila: user.upazila || '',
      });
      setFetchingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    if (editing && profile.district) {
      const selected = districtsInfo.find((d) => d.name === profile.district);
      if (selected) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selected.id
        );
        setFilteredUpazilas(upazilas);
        if (!upazilas.find((u) => u.name === profile.upazila)) {
          setProfile((prev) => ({ ...prev, upazila: '' }));
        }
      }
    } else {
      setFilteredUpazilas([]);
    }
  }, [profile.district, editing]);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfile((prev) => ({ ...prev, avatarUrl: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (
      !profile.name ||
      !profile.bloodGroup ||
      !profile.district ||
      !profile.upazila
    ) {
      setError('Please fill all required fields.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: profile.name,
          bloodGroup: profile.bloodGroup,
          district: profile.district,
          upazila: profile.upazila,
          avatarUrl: profile.avatarUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Profile updated!');
        setEditing(false);
        setOriginalProfile({ ...profile });
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditToggle = () => {
    if (editing) {
      setProfile({ ...originalProfile });
      setEditing(false);
      setError('');
    } else {
      setEditing(true);
    }
  };

  if (sessionLoading || fetchingProfile) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          <User className="text-red-500" size={20} />
          Profile Settings
        </h1>
        
        {!editing && (
          <button
            onClick={handleEditToggle}
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            <Pencil size={14} className="text-slate-400" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Avatar Area */}
          <div className="flex flex-col items-center border-b border-slate-100 pb-8">
            <div
              className={`relative group rounded-full ${editing ? 'cursor-pointer ring-4 ring-offset-2 ring-red-500/10' : ''}`}
              onClick={() => editing && fileInputRef.current?.click()}
            >
              <img
                src={profile.avatarUrl || '/default-avatar.png'}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border border-slate-200 bg-slate-50 shadow-xs"
              />
              {editing && (
                <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="text-white" size={20} />
                </div>
              )}
            </div>
            {editing && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <p className="text-[11px] font-medium text-slate-400 mt-2.5">
                  Click image to replace avatar
                </p>
              </>
            )}
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl transition-all ${
                    editing
                      ? 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                      : 'bg-slate-50 border-slate-200/70 text-slate-500 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/70 rounded-xl text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Blood Type
              </label>
              <div className="relative">
                <Droplet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                {editing ? (
                  <select
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    onChange={handleChange}
                    className="w-full appearance-none pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
                  >
                    <option value="" disabled>Select blood group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.bloodGroup}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/70 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                )}
                {editing && (
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Empty space layout sync */}
            <div className="hidden md:block" />

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                District
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                {editing ? (
                  <select
                    name="district"
                    value={profile.district}
                    onChange={handleChange}
                    className="w-full appearance-none pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
                  >
                    <option value="" disabled>Select district</option>
                    {districtsInfo.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.district}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/70 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                )}
                {editing && (
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Upazila
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                {editing ? (
                  <select
                    name="upazila"
                    value={profile.upazila}
                    onChange={handleChange}
                    disabled={!profile.district}
                    className="w-full appearance-none pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>Select upazila</option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.upazila}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200/70 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                )}
                {editing && (
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Action Footer */}
          {editing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleEditToggle}
                className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}