"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, Store } from "lucide-react";
import { supabaseClient } from "../../lib/client";

export default function VendorActions() {
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    async function checkVendor() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) return;

      const { data } = await supabaseClient
        .from("vendors")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsVendor(Boolean(data));
    }

    checkVendor();
  }, []);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {isVendor ? (
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <BarChart3 className="h-5 w-5" />
          My Dashboard
        </Link>
      ) : (
        <Link
          href="/become-vendor"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-emerald-900"
        >
          <Store className="h-5 w-5" />
          List your business
        </Link>
      )}

      <Link
        href="/pricing"
        className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-emerald-900"
      >
        See vendor plans
      </Link>
    </div>
  );
}
