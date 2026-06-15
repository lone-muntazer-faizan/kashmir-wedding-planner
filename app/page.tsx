import Link from "next/link";
import type { ComponentType } from "react";
import { supabase } from "../lib/supabase";
import { withTimeout } from "../lib/queryTimeout";
import {
  ArrowRight,
  BadgeCheck,
  Building,
  Camera,
  Car,
  ChefHat,
  HeartHandshake,
  Music,
  Palette,
  Search,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

const categoryIcons: Record<string, ComponentType<{ className?: string }>> = {
  Photographer: Camera,
  Videographer: Video,
  "Makeup Artist": Sparkles,
  DJ: Music,
  "Wedding Car": Car,
  Waza: ChefHat,
  "Wedding Hall": Building,
  Decorator: Palette,
};

const fallbackCategories = [
  { id: "photographer", name: "Photographer" },
  { id: "waza", name: "Waza" },
  { id: "makeup", name: "Makeup Artist" },
  { id: "hall", name: "Wedding Hall" },
  { id: "decorator", name: "Decorator" },
  { id: "video", name: "Videographer" },
];

export default async function Home() {
  const { data } = await withTimeout(
    supabase.from("categories").select("*"),
    2500,
    { data: null, error: null } as any
  );
  const categories = data?.length ? data : fallbackCategories;

  return (
    <main>
      <section className="relative min-h-[680px] overflow-hidden bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
          alt="Wedding celebration"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-slate-950/55" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Trusted wedding vendors across Kashmir
            </p>
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              Plan a beautiful Kashmir wedding with verified local vendors.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Compare photographers, wazwan caterers, halls, decorators, makeup
              artists, transport, and entertainment in one professional
              marketplace.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-4 font-semibold text-slate-950 hover:bg-amber-100"
              >
                Explore vendors <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/become-vendor"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                List your business
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/95 p-5 text-slate-950 shadow-2xl">
            <div className="grid gap-4">
              <div className="rounded-lg bg-emerald-950 p-5 text-white">
                <p className="text-sm text-emerald-100">For couples</p>
                <h2 className="mt-2 text-2xl font-bold">Find the right vendor faster</h2>
                <p className="mt-3 text-sm leading-6 text-emerald-50">
                  Search by category, district, price, experience, and reviews.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <Stat icon={Search} label="Search" value="Fast" />
                <Stat icon={BadgeCheck} label="Trust" value="Verified" />
                <Stat icon={HeartHandshake} label="Leads" value="Direct" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 md:grid-cols-4">
          <Metric value="500+" label="vendor capacity" />
          <Metric value="20+" label="wedding categories" />
          <Metric value="10" label="Kashmir districts" />
          <Metric value="24/7" label="lead discovery" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
              Categories
            </p>
            <h2 className="mt-3 text-4xl font-bold">Book every wedding service</h2>
          </div>
          <Link href="/vendors" className="font-semibold text-emerald-900 hover:underline">
            View all vendors
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category: { id: string; name: string }) => {
            const Icon = categoryIcons[category.name] || Star;

            return (
              <Link
                key={category.id}
                href={`/vendors?category=${encodeURIComponent(category.name)}`}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-900 hover:shadow-lg"
              >
                <Icon className="h-9 w-9 text-emerald-900" />
                <h3 className="mt-5 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Compare availability, service quality, pricing, and contact
                  details.
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Earn from vendors
            </p>
            <h2 className="mt-4 text-4xl font-bold">Turn the site into a real local business</h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Charge vendors for featured placement, verified badges, premium
              profiles, and direct leads. Start manually with phone/WhatsApp
              payments, then add Razorpay or Stripe when traffic grows.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <RevenueCard title="Featured Listing" price="Rs 999/mo" body="Priority position in search and homepage category cards." />
            <RevenueCard title="Verified Vendor" price="Rs 1,499/mo" body="Verification badge, trust signals, and stronger profile CTA." />
            <RevenueCard title="Premium Profile" price="Rs 2,999/mo" body="Portfolio boost, social links, lead tracking, and support." />
            <RevenueCard title="Lead Package" price="Custom" body="Sell qualified wedding enquiries directly to selected vendors." />
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-stone-50 p-4">
      <Icon className="mx-auto h-5 w-5 text-emerald-900" />
      <p className="mt-2 font-bold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-stone-50 p-5">
      <p className="text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

function RevenueCard({
  title,
  price,
  body,
}: {
  title: string;
  price: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-6">
      <p className="text-sm font-semibold text-amber-300">{price}</p>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
    </div>
  );
}
