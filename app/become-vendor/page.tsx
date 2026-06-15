"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, ImagePlus, Store, TrendingUp } from "lucide-react";
import { supabaseClient } from "../../lib/client";

const categories = [
  "Photographer",
  "Videographer",
  "Makeup Artist",
  "Mehndi Artist",
  "Decorator",
  "Wedding Hall",
  "DJ",
  "Wedding Car",
  "Waza",
];

export default function BecomeVendorPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("Photographer");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [startingPrice, setStartingPrice] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tagline, setTagline] = useState("");
  const [services, setServices] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        router.push("/login?next=/become-vendor");
        return;
      }

      const { data: vendor } = await supabaseClient
        .from("vendors")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (vendor) router.push("/dashboard");
    }

    checkAccess();
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        setMessage("Please login before creating a vendor profile.");
        setLoading(false);
        return;
      }

      const { data: existingVendor } = await supabaseClient
        .from("vendors")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingVendor) {
        setMessage("You already have a vendor profile. Open your dashboard to edit it.");
        setLoading(false);
        return;
      }

      let imageUrl = "";

      if (image) {
        const fileName = `${user.id}-${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabaseClient.storage
          .from("vendor-images")
          .upload(fileName, image);

        if (uploadError) {
          setMessage(uploadError.message);
          setLoading(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabaseClient.storage.from("vendor-images").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabaseClient.from("vendors").insert([
        {
          user_id: user.id,
          business_name: businessName,
          category,
          district,
          address,
          phone,
          description,
          profile_image: imageUrl,
          tagline,
          starting_price: startingPrice,
          experience_years: experienceYears,
          instagram,
          facebook,
          services,
          verified: false,
          rating: 0,
          total_reviews: 0,
        },
      ]);

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Vendor profile created. Open your dashboard to review it.");
        setTimeout(() => router.push("/dashboard"), 900);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while creating your profile.");
    }

    setLoading(false);
  }

  return (
    <main className="bg-stone-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
              Vendor onboarding
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight">
              List your wedding business and start receiving better leads.
            </h1>
            <p className="mt-5 leading-8 text-slate-600">
              Create a professional profile for couples searching across
              Kashmir. After your listing is live, you can upgrade to featured
              placement from the pricing page.
            </p>
            <div className="mt-8 grid gap-4">
              <Benefit icon={Store} title="Professional profile" body="Show your services, photos, pricing, district, and contact details." />
              <Benefit icon={BadgeCheck} title="Verification ready" body="Admins can mark trusted vendors as verified after checking details." />
              <Benefit icon={TrendingUp} title="Paid upgrade path" body="Offer featured listings and premium profiles to earn monthly revenue." />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5">
              <h2 className="text-2xl font-bold">Business details</h2>
              <Input required label="Business name" value={businessName} onChange={setBusinessName} placeholder="Faizan Photography" />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Category">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-stone-50 px-4 py-3 outline-none focus:border-emerald-900"
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </Field>
                <Input required label="District" value={district} onChange={setDistrict} placeholder="Srinagar" />
              </div>
              <Input required label="Address" value={address} onChange={setAddress} placeholder="Full business address" />
              <Input required label="Phone number" value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
              <Input required label="Tagline" value={tagline} onChange={setTagline} placeholder="Cinematic weddings across Kashmir" />

              <div className="grid gap-4 md:grid-cols-2">
                <Input required label="Starting price" value={startingPrice} onChange={setStartingPrice} placeholder="25000" />
                <Input label="Years of experience" value={experienceYears} onChange={setExperienceYears} placeholder="5" />
              </div>

              <Textarea label="Services offered" value={services} onChange={setServices} placeholder="Wedding shoot, pre-wedding, drone, albums..." />
              <Textarea required label="About your business" value={description} onChange={setDescription} placeholder="Tell couples what makes your service reliable and special." />

              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Instagram link" value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
                <Input label="Facebook link" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/..." />
              </div>

              <Field label="Business image">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-stone-50 p-6 text-center hover:border-emerald-900">
                  <ImagePlus className="h-8 w-8 text-emerald-900" />
                  <span className="mt-2 font-semibold">Upload profile image</span>
                  <span className="text-sm text-slate-500">JPG, PNG, or WebP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImage(event.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="mt-4 h-52 w-full rounded-lg object-cover" />
                )}
              </Field>

              <button
                disabled={loading}
                type="submit"
                className="rounded-lg bg-emerald-900 px-5 py-4 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
              >
                {loading ? "Creating profile..." : "Create vendor profile"}
              </button>

              {message && (
                <div className="rounded-lg border border-slate-200 bg-stone-50 p-4 text-center font-medium">
                  {message}
                </div>
              )}

              <p className="text-center text-sm text-slate-500">
                Want higher visibility? View{" "}
                <Link href="/pricing" className="font-semibold text-emerald-900">
                  vendor pricing
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Benefit({
  icon: Icon,
  title,
  body,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-stone-50 p-5">
      <Icon className="h-7 w-7 text-emerald-900" />
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <Field label={label}>
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-stone-50 px-4 py-3 outline-none focus:border-emerald-900"
      />
    </Field>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <Field label={label}>
      <textarea
        required={required}
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-stone-50 px-4 py-3 outline-none focus:border-emerald-900"
      />
    </Field>
  );
}
