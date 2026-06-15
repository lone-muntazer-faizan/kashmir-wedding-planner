"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../../lib/client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created successfully!");

    setTimeout(() => {
      router.push("/vendors");
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 shadow-2xl">

          {/* Header */}
          <div className="text-center">

            <div className="text-6xl mb-4">
              💍
            </div>

            <h1 className="text-5xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-gray-300 mt-4">
              Join Kashmir Wedding Planner and
              connect with premium wedding vendors.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSignup}
            className="mt-10 space-y-5"
          >

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-purple-500 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:scale-105 transition duration-300 shadow-xl"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Message */}
          {message && (
            <div
              className={`mt-5 p-4 rounded-xl text-center ${
                message.includes("success")
                  ? "bg-green-500/20 text-green-300 border border-green-500/20"
                  : "bg-red-500/20 text-red-300 border border-red-500/20"
              }`}
            >
              {message}
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">

            <p className="text-gray-400">
              Already have an account?
            </p>

            <button
              onClick={() => router.push("/login")}
              className="mt-3 w-full border border-white/20 py-4 rounded-xl text-white hover:bg-white/10 transition"
            >
              Login Instead
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}