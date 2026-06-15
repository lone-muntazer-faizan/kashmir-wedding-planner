"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient } from "../../lib/client";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setEmail(user.email || "");

      const { data: vendorData, error } =
        await supabaseClient
          .from("vendors")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (!error) {
        setVendor(vendorData);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-5 text-lg">Loading Dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Vendor Dashboard
            </h1>

            <p className="text-gray-400 mt-3">
              {email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>

        {!vendor ? (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold">
              No Vendor Profile Found
            </h2>

            <p className="mt-4 text-gray-300">
              Create your vendor profile to start
              receiving wedding bookings.
            </p>

            <Link
              href="/become-vendor"
              className="inline-block mt-6 bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-xl font-semibold"
            >
              Create Vendor Profile
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cover Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {vendor.profile_image ? (
                <img
                  src={vendor.profile_image}
                  alt={vendor.business_name}
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="h-[400px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center">
                  <h2 className="text-5xl font-bold">
                    {vendor.business_name}
                  </h2>
                </div>
              )}

              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h2 className="text-4xl font-bold">
                      {vendor.business_name}
                    </h2>

                    <p className="text-purple-300 text-xl mt-2">
                      {vendor.category}
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {vendor.verified ? (
                      <span className="bg-green-500 px-5 py-2 rounded-full font-medium">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-medium">
                        Pending Verification
                      </span>
                    )}

                    <Link
                      href="/dashboard/edit"
                      className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl"
                    >
                      Edit Profile
                    </Link>

                    <Link
                      href={`/vendors/${vendor.id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
                    >
                      View Public Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
                <h3 className="text-gray-400">
                  Rating
                </h3>

                <p className="text-4xl font-bold mt-2">
                  ⭐ {vendor.rating || 0}
                </p>
              </div>

              <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
                <h3 className="text-gray-400">
                  Reviews
                </h3>

                <p className="text-4xl font-bold mt-2">
                  {vendor.total_reviews || 0}
                </p>
              </div>

              <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
                <h3 className="text-gray-400">
                  District
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {vendor.district || "N/A"}
                </p>
              </div>

              <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
                <h3 className="text-gray-400">
                  Status
                </h3>

                <p className="text-2xl font-bold mt-2">
                  {vendor.verified
                    ? "Active"
                    : "Pending"}
                </p>
              </div>
            </div>

            {/* About */}
            <div className="bg-white/10 rounded-3xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-5">
                About Business
              </h3>

              <p className="text-gray-300 leading-8 text-lg">
                {vendor.description ||
                  "No description available."}
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white/10 rounded-3xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-5">
                Contact Details
              </h3>

              <div className="space-y-4 text-lg">
                <p>
                  📍 {vendor.address || "No address"}
                </p>

                <p>
                  📞 {vendor.phone || "No phone"}
                </p>

                <p>
                  🏙️ {vendor.district || "No district"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}