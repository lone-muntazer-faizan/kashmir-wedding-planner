"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../../lib/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful!");

   setTimeout(() => {
  const next =
    new URLSearchParams(window.location.search)
      .get("next");

  router.push(next || "/");
}, 500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">

          <div className="text-center">
            <div className="text-6xl mb-4">💍</div>

            <h1 className="text-5xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-300 mt-4">
              Login to Kashmir Wedding Planner
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-5"
          >
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
                ? "Signing In..."
                : "Login"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-5 p-4 rounded-xl text-center ${
                message.includes("successful")
                  ? "bg-green-500/20 text-green-300 border border-green-500/20"
                  : "bg-red-500/20 text-red-300 border border-red-500/20"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?
            </p>

            <button
              onClick={() =>
                router.push("/signup")
              }
              className="mt-3 w-full border border-white/20 py-4 rounded-xl text-white hover:bg-white/10 transition"
            >
              Create Account
            </button>
          </div>

        </div>

      </div>

    </main>
  );
}