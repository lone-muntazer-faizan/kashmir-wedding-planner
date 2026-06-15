"use client";

import { useState } from "react";
import Link from "next/link";

export default function VendorSearch({
  vendors,
}: {
  vendors: any[];
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = `
      ${vendor.business_name}
      ${vendor.category}
      ${vendor.district}
      ${vendor.description}
    `
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : vendor.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-8 mb-12">

  {/* LEFT SIDE */}

  <div className="lg:col-span-3">

    {/* Search */}

    <div className="mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search photographers, decorators, wedding halls..."
        className="
        w-full
        bg-white/10
        border
        border-white/20
        rounded-2xl
        p-5
        text-white
        placeholder-gray-400
        "
      />
    </div>

    {/* Categories */}

    <div className="flex flex-wrap gap-3">

      <button
        onClick={() => setSelectedCategory("All")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "All"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        All Vendors
      </button>

      <button
        onClick={() => setSelectedCategory("Photographer")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "Photographer"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        📸 Photographers
      </button>

      <button
        onClick={() => setSelectedCategory("Videographer")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "Videographer"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        🎥 Videographers
      </button>

      <button
        onClick={() => setSelectedCategory("Makeup Artist")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "Makeup Artist"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        💄 Makeup
      </button>

      <button
        onClick={() => setSelectedCategory("Decorator")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "Decorator"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        🎉 Decorators
      </button>

      <button
        onClick={() => setSelectedCategory("Wedding Hall")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "Wedding Hall"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        🏛 Wedding Halls
      </button>

      <button
        onClick={() => setSelectedCategory("DJ")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "DJ"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        🎧 DJ
      </button>

      <button
        onClick={() => setSelectedCategory("Waza")}
        className={`px-5 py-3 rounded-full ${
          selectedCategory === "Waza"
            ? "bg-pink-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        🍽 Waza
      </button>

    </div>

  </div>

  {/* RIGHT SIDE VENDOR CTA */}

  
</div>

      {/* Results Count */}
      <div className="text-center mb-8">
        <p className="text-gray-400">
          Showing {filteredVendors.length} vendor
          {filteredVendors.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Vendor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVendors.map((vendor) => (
          <Link
            key={vendor.id}
            href={`/vendors/${vendor.id}`}
          >
            <div
              className="
              group
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              overflow-hidden
              hover:border-purple-500/50
              hover:-translate-y-2
              hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]
              transition-all
              duration-500
              "
            >
              <div className="relative h-72 overflow-hidden">
                {vendor.profile_image ? (
                  <img
                    src={vendor.profile_image}
                    alt={vendor.business_name}
                    className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-700
                    "
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-2 rounded-full text-sm">
                    {vendor.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white">
                    {vendor.business_name}
                  </h2>

                  <p className="text-pink-300">
                    {vendor.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300">
                  📍 {vendor.district}
                </p>

                <p className="text-cyan-300 mt-2">
                  🎖 {vendor.experience_years || 0}+ Years
                </p>

                <p className="text-green-400 font-bold mt-2 text-lg">
                  ₹ {vendor.starting_price}
                </p>

                <div className="mt-4">
                  <p className="text-gray-400 line-clamp-2">
                    {vendor.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div>
                    ⭐ {vendor.rating || 5}
                  </div>

                  <div className="text-pink-400 font-semibold">
                    View Details →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Become Vendor Card */}


    </>
  );
}