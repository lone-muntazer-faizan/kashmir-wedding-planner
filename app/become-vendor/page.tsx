"use client";

import { useState } from "react";
import { supabaseClient } from "../../lib/client";

export default function BecomeVendorPage() {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        setMessage("Please login first.");
        setLoading(false);
        return;
      }

      // Check existing vendor profile
      const { data: existingVendor } = await supabaseClient
        .from("vendors")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingVendor) {
        setMessage(
          "You already have a vendor profile. You can edit it from your dashboard."
        );
        setLoading(false);
        return;
      }

      let imageUrl = "";

      if (image) {
        const fileName = `${user.id}-${Date.now()}-${image.name}`;

        const { error: uploadError } =
          await supabaseClient.storage
            .from("vendor-images")
            .upload(fileName, image);

        if (uploadError) {
          setMessage(uploadError.message);
          setLoading(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabaseClient.storage
          .from("vendor-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabaseClient
        .from("vendors")
        .insert([
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
}
        ]);

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "🎉 Vendor profile created successfully! Visit your dashboard."
        );

        setBusinessName("");
        setCategory("Photographer");
        setDistrict("");
        setAddress("");
        setPhone("");
        setDescription("");
setImage(null);

setTagline("");
setStartingPrice("");
setExperienceYears("");
setInstagram("");
setFacebook("");
setServices("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
  <h1 className="text-5xl font-bold text-white">
    Become a Vendor
  </h1>

  <p className="text-purple-200 mt-4 text-lg">
    Join Kashmir's fastest growing wedding marketplace
  </p>

  <div className="mt-8 grid md:grid-cols-3 gap-4">

    <div className="bg-white/10 p-4 rounded-2xl text-white">
      📈 Get More Wedding Leads
    </div>

    <div className="bg-white/10 p-4 rounded-2xl text-white">
      ⭐ Build Your Reputation
    </div>

    <div className="bg-white/10 p-4 rounded-2xl text-white">
      💍 Reach Couples Across Kashmir
    </div>

  </div>
</div>

        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-8
          shadow-2xl
        "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
  Business Information
</h2>
            <input
              required
              placeholder="Business Name (e.g. Faizan Photography)"
              value={businessName}
              onChange={(e) =>
                setBusinessName(e.target.value)
              }
              className="
              w-full
              bg-white/10
              border
              border-white/20
              rounded-xl
              p-4
              text-white
              placeholder-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-pink-400
            "
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
              w-full
              bg-white/10
              border
              border-white/20
              rounded-xl
              p-4
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-pink-400
            "
            >
              <option className="text-black">
                Photographer
              </option>
              <option className="text-black">
                Videographer
              </option>
              <option className="text-black">
                Makeup Artist
              </option>
              <option className="text-black">
                Mehndi Artist
              </option>
              <option className="text-black">
                Decorator
              </option>
              <option className="text-black">
                Wedding Hall
              </option>
              <option className="text-black">
                DJ
              </option>
              <option className="text-black">
                Wedding Car
              </option>
              <option className="text-black">
                Waza
              </option>
            </select>

            <input
              required
              placeholder="District (Srinagar, Baramulla, Anantnag...)"
              value={district}
              onChange={(e) =>
                setDistrict(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
            />

            <input
              required
              placeholder="Complete Business Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
            />

            <input
              required
             placeholder="Business Contact Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
            />

            <input
  required
  placeholder="Business Tagline (e.g. Making Weddings Magical)"
  value={tagline}
  onChange={(e) => setTagline(e.target.value)}
  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
/>

<h2 className="text-2xl font-bold text-white pt-6">
  Pricing & Experience
</h2>
<input
  required
  placeholder="Starting Price (₹)"
  value={startingPrice}
  onChange={(e) => setStartingPrice(e.target.value)}
  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
/>

<input
  placeholder="Years of Experience"
  value={experienceYears}
  onChange={(e) => setExperienceYears(e.target.value)}
  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
/>

<h2 className="text-2xl font-bold text-white pt-6">
  Social Media
</h2>
<input
  placeholder="Instagram Link"
  value={instagram}
  onChange={(e) => setInstagram(e.target.value)}
  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
/>

<input
  placeholder="Facebook Link"
  value={facebook}
  onChange={(e) => setFacebook(e.target.value)}
  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
/>

<h2 className="text-2xl font-bold text-white pt-6">
  Services
</h2>
<textarea
  placeholder="Services Offered (Photography, Pre-Wedding Shoots, Drone Coverage...)"
  value={services}
  onChange={(e) => setServices(e.target.value)}
  className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
/>
            <h2 className="text-2xl font-bold text-white pt-6">
  About Your Business
</h2>
            <textarea
              required
              placeholder="Tell customers about your services..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full h-40 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-300"
            />

            <div className="bg-white/5 border border-dashed border-white/30 rounded-2xl p-6">
              <p className="text-white mb-3 font-medium">
                Upload Business Image
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] || null
                  )
                }
                className="text-white"
              />

              {image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-48 w-full object-cover rounded-xl"
                  />
                </div>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="
              w-full
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              text-white
              font-semibold
              py-4
              rounded-xl
              shadow-xl
              hover:scale-105
              transition
              duration-300
              disabled:opacity-50
            "
            >
              {loading
                ? "Creating Profile..."
                : "🚀 Launch My Vendor Profile"}
            </button>
          </form>

          {message && (
            <div className="mt-6 text-center text-white font-medium">
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}