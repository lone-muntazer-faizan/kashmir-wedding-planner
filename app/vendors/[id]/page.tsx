import { supabase } from "@/lib/supabase";
import { withTimeout } from "@/lib/queryTimeout";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ExternalLink,
  IndianRupee,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

export default async function VendorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: vendor } = await withTimeout(
    supabase.from("vendors").select("*").eq("id", id).maybeSingle(),
    5000,
    { data: null, error: null } as any
  );

  if (!vendor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Vendor not found</h1>
          <Link href="/vendors" className="mt-4 inline-block font-semibold text-emerald-900">
            Back to vendors
          </Link>
        </div>
      </main>
    );
  }

  const phone = String(vendor.phone || "");
  const whatsappPhone = phone.replace(/\D/g, "");

  return (
    <main className="bg-stone-50">
      <section className="relative min-h-[520px] overflow-hidden bg-slate-950 text-white">
        {vendor.profile_image ? (
          <img
            src={vendor.profile_image}
            alt={vendor.business_name}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
        ) : (
          <div className="absolute inset-0 bg-emerald-950" />
        )}
        <div className="absolute inset-0 bg-slate-950/55" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-5 py-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                {vendor.category}
              </span>
              {vendor.verified && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white">
                  <BadgeCheck className="h-4 w-4" />
                  Verified vendor
                </span>
              )}
            </div>
            <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
              {vendor.business_name}
            </h1>
            {vendor.tagline && (
              <p className="mt-4 max-w-2xl text-xl text-slate-100">{vendor.tagline}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-100">
              <Info icon={MapPin} label={vendor.district || "Kashmir"} />
              <Info icon={Star} label={`${vendor.rating || 5} rating (${vendor.total_reviews || 0} reviews)`} />
              <Info icon={BriefcaseBusiness} label={`${vendor.experience_years || 0}+ years experience`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-4 leading-8 text-slate-600">
              {vendor.description || "Contact this vendor for more details."}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Services offered</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
              {vendor.services || "Contact vendor for package and service details."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Detail icon={IndianRupee} title="Starting price" value={`Rs ${vendor.starting_price || "Contact"}`} />
            <Detail icon={BriefcaseBusiness} title="Experience" value={`${vendor.experience_years || 0}+ years`} />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Location</h2>
            <div className="mt-4 grid gap-3 text-slate-700">
              <Info icon={MapPin} label={vendor.address || "Address not added"} />
              <Info icon={Phone} label={phone || "Phone not added"} />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold">Contact vendor</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Ask about availability, wedding date, packages, and booking amount.
            </p>

            {phone && (
              <a
                href={`tel:${phone}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-4 font-semibold text-white hover:bg-emerald-900"
              >
                <Phone className="h-5 w-5" />
                Call now
              </a>
            )}

            {whatsappPhone && (
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                className="mt-3 block rounded-lg border border-emerald-900 px-5 py-4 text-center font-semibold text-emerald-900 hover:bg-emerald-50"
              >
                WhatsApp vendor
              </a>
            )}

            <div className="mt-5 grid gap-3">
              {vendor.instagram && (
                <a href={vendor.instagram} target="_blank" className="flex items-center gap-2 text-slate-700 hover:text-emerald-900">
                  <ExternalLink className="h-5 w-5" />
                  Instagram
                </a>
              )}
              {vendor.facebook && (
                <a href={vendor.facebook} target="_blank" className="flex items-center gap-2 text-slate-700 hover:text-emerald-900">
                  <ExternalLink className="h-5 w-5" />
                  Facebook
                </a>
              )}
            </div>

            <Link
              href="/vendors"
              className="mt-6 block rounded-lg bg-stone-100 px-5 py-3 text-center font-semibold text-slate-800 hover:bg-stone-200"
            >
              Back to vendors
            </Link>
          </div>
        </aside>
      </section>
    </main>
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
    <span className="inline-flex items-center gap-2">
      <Icon className="h-4 w-4" />
      {label}
    </span>
  );
}

function Detail({
  icon: Icon,
  title,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Icon className="h-7 w-7 text-emerald-900" />
      <p className="mt-4 text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
