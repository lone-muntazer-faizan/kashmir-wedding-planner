import { supabase } from "../../lib/supabase";
import { withTimeout } from "../../lib/queryTimeout";
import VendorActions from "./VendorActions";
import VendorSearch from "./VendorSearch";

export default async function VendorsPage() {
  const { data: vendors, error } = await withTimeout(
    supabase.from("vendors").select("*").order("created_at", { ascending: false }),
    3500,
    { data: [], error: null } as any
  );

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5">
        <div className="max-w-lg rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">Could not load vendors</h1>
          <p className="mt-3 text-slate-600">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-stone-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
                Vendor directory
              </p>
              <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight text-slate-950">
                Find trusted wedding professionals in Kashmir.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Compare services, starting prices, experience, districts, and
                contact options before you book.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-stone-50 px-6 py-5">
              <p className="text-3xl font-bold text-slate-950">{vendors?.length || 0}</p>
              <p className="text-sm text-slate-600">listed vendors</p>
            </div>
          </div>
          <VendorActions />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <VendorSearch vendors={vendors || []} />
      </section>
    </main>
  );
}
