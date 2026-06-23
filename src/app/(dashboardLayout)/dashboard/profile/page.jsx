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

  // Start with session data (may be incomplete)
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
      fetch(`http://localhost:5000/api/profile?email=${user.email}`)
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
            // Even if the API fails, we keep the session data
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

  // Update upazila list when district changes (in edit mode)
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
      const res = await fetch('http://localhost:5000/api/profile', {
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <User className="text-red-500" size={24} />
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-gray-200/60 overflow-hidden">
        {/* subtle gradient line on top */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        <div className="p-8 md:p-10 space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div
              className="relative group cursor-pointer"
              onClick={() => editing && fileInputRef.current?.click()}
            >
              <img
                src={profile.avatarUrl || '/default-avatar.png'}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-red-100 shadow-md"
              />
              {editing && (
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
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
                <p className="text-xs text-gray-500 mt-2">
                  Click avatar to change
                </p>
              </>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition ${
                    editing
                      ? 'bg-white border-gray-300 text-gray-800 focus:ring-2 focus:ring-red-500'
                      : 'bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Email – always disabled */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-1">
                Email cannot be changed.
              </p>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Blood Group
              </label>
              <div className="relative">
                <Droplet
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                {editing ? (
                  <select
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    onChange={handleChange}
                    className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select blood group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.bloodGroup}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                  />
                )}
                {editing && (
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                )}
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                District
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                {editing ? (
                  <select
                    name="district"
                    value={profile.district}
                    onChange={handleChange}
                    className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select district
                    </option>
                    {districtsInfo.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.district}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                  />
                )}
                {editing && (
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                )}
              </div>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Upazila
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                {editing ? (
                  <select
                    name="upazila"
                    value={profile.upazila}
                    onChange={handleChange}
                    disabled={!profile.district}
                    className="w-full appearance-none pl-12 pr-10 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select upazila
                    </option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profile.upazila}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                  />
                )}
                {editing && (
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              {!editing ? (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 transition"
                >
                  <Pencil size={18} />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 transition disabled:opacity-70"
                  >
                    {saving ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}