import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function VendorEntry() {

  redirect("/login");

}