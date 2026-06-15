import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kashmir Wedding Planner | Find Trusted Wedding Vendors",
  description:
    "Discover photographers, wazwan caterers, makeup artists, decorators, halls, transport, and wedding services across Kashmir.",
};

const navLinks = [
  { href: "/vendors", label: "Vendors" },
  { href: "/pricing", label: "Pricing" },
  { href: "/become-vendor", label: "List Business" },
  { href: "/login", label: "Login" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-50 text-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-900 text-sm font-bold text-white">
                KW
              </span>
              <span>
                <span className="block text-base font-bold leading-tight">
                  Kashmir Wedding
                </span>
                <span className="block text-xs text-slate-500">
                  Planner marketplace
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-emerald-900">
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/vendors"
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
            >
              Find Vendors
            </Link>
          </div>
        </header>

        <div className="min-h-screen">{children}</div>

        <footer className="border-t border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <h2 className="text-xl font-bold">Kashmir Wedding Planner</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                A local wedding marketplace helping couples compare trusted
                Kashmir vendors and helping businesses receive better leads.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <div className="mt-3 grid gap-2 text-sm text-slate-300">
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">For Vendors</h3>
              <div className="mt-3 grid gap-2 text-sm text-slate-300">
                <Link href="/become-vendor">Create Listing</Link>
                <Link href="/pricing">Vendor Plans</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 px-5 py-4 text-center text-sm text-slate-400">
            Copyright 2026 Kashmir Wedding Planner. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
