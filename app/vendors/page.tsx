import Link from "next/link";
import { supabase } from "../../lib/supabase";
import VendorSearch from "./VendorSearch";
import VendorActions from "./VendorActions";

export default async function VendorsPage() {
  const { data: vendors, error } = await supabase
    .from("vendors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Error Loading Vendors</h1>
          <p className="text-gray-400 mt-2">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10" />

  <div className="max-w-7xl mx-auto px-6 py-24 relative">
    <div className="text-center">

      <h1 className="text-6xl md:text-7xl font-bold text-white">
  Find Your Perfect
</h1>

<h2 className="mt-3 text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
  Wedding Vendor
</h2>

      <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto">
        Compare prices, explore portfolios, read reviews,
and connect with Kashmir's top wedding professionals.
      </p>
   
      
   
      {/* ACTION BUTTONS */}


      {/* STATS */}
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl text-white">
          {vendors?.length || 0}+ Vendors
        </div>

      
      </div>

    </div>
  </div>
</section>
{/* Vendor Search + Listings */}

<section className="max-w-7xl mx-auto px-6 pb-20">
  <VendorActions />

  <VendorSearch vendors={vendors || []} />

</section>

    </main>
  );
}