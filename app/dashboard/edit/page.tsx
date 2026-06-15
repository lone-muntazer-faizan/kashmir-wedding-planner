"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../../../lib/client";

export default function EditVendorPage() {
  const [vendorId, setVendorId] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tagline, setTagline] = useState("");
const [startingPrice, setStartingPrice] = useState("");
const [experienceYears, setExperienceYears] = useState("");
const [instagram, setInstagram] = useState("");
const [facebook, setFacebook] = useState("");
const [services, setServices] = useState("");

  useEffect(() => {
    async function loadVendor() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: vendor, error } =
        await supabaseClient
          .from("vendors")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (!error && vendor) {
        setVendorId(vendor.id);
        setBusinessName(vendor.business_name || "");
        setCategory(vendor.category || "");
        setDistrict(vendor.district || "");
        setAddress(vendor.address || "");
        setPhone(vendor.phone || "");
        setDescription(vendor.description || "");
        setTagline(vendor.tagline || "");
setStartingPrice(vendor.starting_price || "");
setExperienceYears(vendor.experience_years || "");
setInstagram(vendor.instagram || "");
setFacebook(vendor.facebook || "");
setServices(vendor.services || "");
      }
    }

    loadVendor();
  }, []);

  async function updateVendor(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!vendorId) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabaseClient
      .from("vendors")
      .update({
  business_name: businessName,
  category,
  district,
  address,
  phone,
  description,

  tagline,
  starting_price: startingPrice,
  experience_years: experienceYears,
  instagram,
  facebook,
  services,
})
      .eq("id", vendorId);

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Profile updated successfully ✅"
      );
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Edit Vendor Profile
            </h1>

            <a
              href="/dashboard"
              className="
              bg-white/10
              hover:bg-white/20
              text-white
              px-5
              py-2
              rounded-xl
              transition
              "
            >
              Back
            </a>

          </div>

          <form
            onSubmit={updateVendor}
            className="space-y-5"
          >

            <div>
              <label className="text-gray-300 block mb-2">
                Business Name
              </label>

              <input
                value={businessName}
                onChange={(e) =>
                  setBusinessName(e.target.value)
                }
                className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                text-white
                border
                border-white/10
                "
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                text-white
                border
                border-white/10
                "
              >
                <option value="Photographer">
                  Photographer
                </option>

                <option value="Videographer">
                  Videographer
                </option>

                <option value="Waza">
                  Waza
                </option>

                <option value="DJ">
                  DJ
                </option>

                <option value="Decorator">
                  Decorator
                </option>

                <option value="Wedding Hall">
                  Wedding Hall
                </option>

                <option value="Makeup Artist">
                  Makeup Artist
                </option>
              </select>
            </div>

            <div>
              <label className="text-gray-300 block mb-2">
                District
              </label>

              <input
                value={district}
                onChange={(e) =>
                  setDistrict(e.target.value)
                }
                className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                text-white
                border
                border-white/10
                "
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2">
                Address
              </label>

              <input
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                text-white
                border
                border-white/10
                "
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2">
                Phone Number
              </label>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                text-white
                border
                border-white/10
                "
              />
            </div>
<div>
  <label className="text-gray-300 block mb-2">
    Tagline
  </label>

  <input
    value={tagline}
    onChange={(e) => setTagline(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/10"
  />
</div>

<div>
  <label className="text-gray-300 block mb-2">
    Starting Price
  </label>

  <input
    value={startingPrice}
    onChange={(e) => setStartingPrice(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/10"
  />
</div>

<div>
  <label className="text-gray-300 block mb-2">
    Experience Years
  </label>

  <input
    value={experienceYears}
    onChange={(e) => setExperienceYears(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/10"
  />
</div>

<div>
  <label className="text-gray-300 block mb-2">
    Instagram Link
  </label>

  <input
    value={instagram}
    onChange={(e) => setInstagram(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/10"
  />
</div>

<div>
  <label className="text-gray-300 block mb-2">
    Facebook Link
  </label>

  <input
    value={facebook}
    onChange={(e) => setFacebook(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/10"
  />
</div>

<div>
  <label className="text-gray-300 block mb-2">
    Services Offered
  </label>

  <textarea
    rows={4}
    value={services}
    onChange={(e) => setServices(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/10"
  />
</div>
            <div>
              <label className="text-gray-300 block mb-2">
                Description
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                text-white
                border
                border-white/10
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              py-4
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r
              from-purple-600
              via-pink-500
              to-purple-600
              hover:scale-[1.02]
              transition
              "
            >
              {loading
                ? "Updating..."
                : "Save Changes"}
            </button>

          </form>

          {message && (
            <div className="mt-5 text-center text-green-400">
              {message}
            </div>
          )}

        </div>

      </div>

    </main>
  );
}