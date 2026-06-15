"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  BriefcaseBusiness,
  IndianRupee,
  MapPin,
  Search,
  Star,
} from "lucide-react";

type Vendor = {
  id: string;
  business_name?: string;
  category?: string;
  district?: string;
  description?: string;
  tagline?: string;
  profile_image?: string;
  experience_years?: number | string;
  starting_price?: number | string;
  rating?: number | string;
  verified?: boolean;
};

const categories = [
  "All",
  "Photographer",
  "Videographer",
  "Makeup Artist",
  "Decorator",
  "Wedding Hall",
  "DJ",
  "Waza",
  "Wedding Car",
];

export default function VendorSearch({ vendors }: { vendors: Vendor[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [district, setDistrict] = useState("All");
  const [sort, setSort] = useState("Newest");

  const districts = useMemo(() => {
    const values = vendors
      .map((vendor) => vendor.district)
      .filter(Boolean)
      .map((value) => String(value));
    return ["All", ...Array.from(new Set(values)).sort()];
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    const filtered = vendors.filter((vendor) => {
      const haystack = [
        vendor.business_name,
        vendor.category,
        vendor.district,
        vendor.description,
        vendor.tagline,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || vendor.category === selectedCategory;
      const matchesDistrict = district === "All" || vendor.district === district;

      return matchesSearch && matchesCategory && matchesDistrict;
    });

    return filtered.sort((a, b) => {
      if (sort === "Rating") return Number(b.rating || 0) - Number(a.rating || 0);
      if (sort === "Price") {
        return Number(a.starting_price || 0) - Number(b.starting_price || 0);
      }
      if (sort === "Experience") {
        return Number(b.experience_years || 0) - Number(a.experience_years || 0);
      }
      return 0;
    });
  }, [vendors, search, selectedCategory, district, sort]);

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px_160px]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search photographers, halls, waza, decorators..."
              className="w-full rounded-lg border border-slate-200 bg-stone-50 py-3 pl-12 pr-4 text-slate-950 outline-none focus:border-emerald-900"
            />
          </label>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="rounded-lg border border-slate-200 bg-stone-50 px-4 py-3 outline-none focus:border-emerald-900"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="rounded-lg border border-slate-200 bg-stone-50 px-4 py-3 outline-none focus:border-emerald-900"
          >
            {districts.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-lg border border-slate-200 bg-stone-50 px-4 py-3 outline-none focus:border-emerald-900"
          >
            <option>Newest</option>
            <option>Rating</option>
            <option>Price</option>
            <option>Experience</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-950">{filteredVendors.length}</span> vendors
        </p>
        <Link href="/become-vendor" className="text-sm font-semibold text-emerald-900 hover:underline">
          Add your business
        </Link>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold">No vendors found</h2>
          <p className="mt-2 text-slate-600">Try another category, district, or search term.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.id}`}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-900 hover:shadow-xl"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                {vendor.profile_image ? (
                  <img
                    src={vendor.profile_image}
                    alt={vendor.business_name || "Vendor"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-emerald-950 text-3xl font-bold text-white">
                    {vendor.business_name?.slice(0, 2).toUpperCase() || "KW"}
                  </div>
                )}
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-950 shadow">
                  {vendor.category || "Vendor"}
                </div>
                {vendor.verified && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-900 px-3 py-1 text-sm font-semibold text-white">
                    <BadgeCheck className="h-4 w-4" />
                    Verified
                  </div>
                )}
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-950">
                  {vendor.business_name || "Wedding Vendor"}
                </h2>
                <p className="mt-1 line-clamp-1 text-sm text-slate-600">
                  {vendor.tagline || vendor.description || "Professional wedding service"}
                </p>

                <div className="mt-5 grid gap-3 text-sm text-slate-700">
                  <Info icon={MapPin} label={vendor.district || "Kashmir"} />
                  <Info icon={BriefcaseBusiness} label={`${vendor.experience_years || 0}+ years experience`} />
                  <Info icon={IndianRupee} label={`Starting from Rs ${vendor.starting_price || "Contact"}`} />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {vendor.rating || 5}
                  </span>
                  <span className="font-semibold text-emerald-900">View details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function Info({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-emerald-900" />
      <span>{label}</span>
    </div>
  );
}
