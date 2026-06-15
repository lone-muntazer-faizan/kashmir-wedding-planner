import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function VendorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: vendor } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!vendor) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">Vendor not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative h-[550px] overflow-hidden">
        {vendor.profile_image ? (
          <img
            src={vendor.profile_image}
            alt={vendor.business_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-700 to-pink-600" />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-10 left-10 max-w-3xl">
          <span className="bg-purple-600 px-4 py-2 rounded-full text-sm">
            {vendor.category}
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-5">
            {vendor.business_name}
          </h1>

          {vendor.tagline && (
            <p className="text-xl text-purple-300 mt-3">
              {vendor.tagline}
            </p>
          )}

          <div className="flex flex-wrap gap-5 mt-5 text-gray-300">
            <span>📍 {vendor.district}</span>

            <span>
              ⭐ {vendor.rating || 5} ({vendor.total_reviews || 0} Reviews)
            </span>

            <span>
              🏆 {vendor.experience_years || 0} Years Experience
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          {/* ABOUT */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-3xl font-bold mb-5">
              About Vendor
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {vendor.description}
            </p>
          </div>

          {/* SERVICES */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-3xl font-bold mb-5">
              Services Offered
            </h2>

            <p className="text-gray-300 leading-8">
              {vendor.services ||
                "Contact vendor for service details."}
            </p>
          </div>

          {/* DETAILS GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6">
              <p className="text-purple-300 text-sm">
                Starting Price
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹ {vendor.starting_price || "Contact"}
              </h3>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">
              <p className="text-cyan-300 text-sm">
                Experience
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {vendor.experience_years || 0} Years
              </h3>
            </div>
          </div>

          {/* LOCATION */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold mb-5">
              Contact Information
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>📍 {vendor.address}</p>
              <p>📞 {vendor.phone}</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <div className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-3xl p-8 sticky top-8">
            <h3 className="text-3xl font-bold">
              Contact Vendor
            </h3>

            <p className="mt-4 text-white/90">
              Connect directly with this wedding professional.
            </p>

            <a
              href={`tel:${vendor.phone}`}
              className="block mt-6 bg-white text-black text-center py-4 rounded-xl font-semibold"
            >
              📞 Call Now
            </a>

            <a
              href={`https://wa.me/${vendor.phone}`}
              target="_blank"
              className="block mt-4 bg-green-500 text-white text-center py-4 rounded-xl font-semibold"
            >
              💬 WhatsApp Vendor
            </a>

            {vendor.instagram && (
              <a
                href={vendor.instagram}
                target="_blank"
                className="block mt-4 bg-white/10 text-center py-4 rounded-xl"
              >
                📷 Instagram
              </a>
            )}

            {vendor.facebook && (
              <a
                href={vendor.facebook}
                target="_blank"
                className="block mt-4 bg-white/10 text-center py-4 rounded-xl"
              >
                👍 Facebook
              </a>
            )}

            <Link
              href="/vendors"
              className="block mt-6 text-center border border-white py-4 rounded-xl"
            >
              ← Back to Vendors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}