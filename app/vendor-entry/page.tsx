import { redirect } from "next/navigation";

export default async function VendorEntry() {
  redirect("/login?next=/vendor-form");
}