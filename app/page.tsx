import Link from "next/link";
import { supabase } from "../lib/supabase";
import {
  Camera,
  Video,
  Brush,
  Music,
  Car,
  Utensils,
  Building,
  PartyPopper,
} from "lucide-react";

const icons: Record<string, any> = {
  Photographer: Camera,
  Videographer: Video,
  "Makeup Artist": Brush,
  DJ: Music,
  "Wedding Car": Car,
  Waza: Utensils,
  "Wedding Hall": Building,
  Decorator: PartyPopper,
};

export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  return (
    <main className="bg-[#0f172a] text-white min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-fuchsia-700 to-pink-600 opacity-90" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
            Kashmir's Premium Wedding Marketplace
          </span>

          <h1 className="text-6xl md:text-7xl font-extrabold mt-8 leading-tight">
            Plan Your
            <span className="block text-yellow-300">
              Dream Wedding
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-white/90">
            Discover photographers, videographers, wedding halls,
            decorators, wazas and more across Kashmir.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/vendors"
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Explore Vendors
            </Link>
<Link
  href="/become-vendor"
  className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
>
  Become Vendor
</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-slate-800 rounded-2xl p-6 text-center shadow-xl">
            <h3 className="text-4xl font-bold text-purple-400">
              500+
            </h3>
            <p className="text-gray-300 mt-2">
              Vendors
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 text-center shadow-xl">
            <h3 className="text-4xl font-bold text-pink-400">
              10K+
            </h3>
            <p className="text-gray-300 mt-2">
              Customers
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 text-center shadow-xl">
            <h3 className="text-4xl font-bold text-yellow-400">
              15+
            </h3>
            <p className="text-gray-300 mt-2">
              Districts
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 text-center shadow-xl">
            <h3 className="text-4xl font-bold text-green-400">
              4.9
            </h3>
            <p className="text-gray-300 mt-2">
              Average Rating
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-center mb-4">
          Wedding Categories
        </h2>

        <p className="text-center text-gray-400 mb-14">
          Everything you need for your perfect wedding.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories?.map((category) => {
            const Icon = icons[category.name];

            return (
              <div
                key={category.id}
                className="
                group
                bg-gradient-to-br
                from-slate-800
                to-slate-900
                rounded-3xl
                p-8
                border
                border-white/10
                hover:border-purple-500
                hover:-translate-y-2
                transition
                duration-300
                shadow-xl
                "
              >
                {Icon && (
                  <Icon className="w-12 h-12 text-purple-400 group-hover:text-pink-400 transition mb-5" />
                )}

                <h3 className="font-semibold text-lg">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURE SECTION */}
      
    </main>
  );
}