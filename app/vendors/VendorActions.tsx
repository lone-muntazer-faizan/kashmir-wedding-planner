"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        console.log("Vendor data:", data);
console.log("User ID:", user.id);

      if (data) {
        setIsVendor(true);
      }
    }

    checkVendor();
  }, []);

 return (
  <div className="flex justify-center gap-4 flex-wrap mt-8">

    {isVendor ? (

      <Link
        href="/dashboard"
        className="
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        shadow-lg
        hover:scale-105
        transition-all
        "
      >
        📊 My Dashboard
      </Link>

    ) : (

      <Link
        href="/become-vendor"
        className="
        bg-gradient-to-r
        from-pink-500
        to-purple-600
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        shadow-lg
        hover:scale-105
        transition-all
        "
      >
        🚀 Become Vendor
      </Link>

    )}

  </div>
);
}