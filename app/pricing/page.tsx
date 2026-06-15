import Link from "next/link";
import type { ComponentType } from "react";
import { BadgeCheck, Check, Crown, Megaphone, TrendingUp } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Good for new vendors who want a basic listing.",
    features: ["Business profile", "Category listing", "Phone and district details", "Dashboard access"],
    cta: "Create free listing",
    href: "/become-vendor",
    highlighted: false,
  },
  {
    name: "Featured",
    price: "Rs 999/mo",
    description: "Best first paid plan for vendors who want more visibility.",
    features: ["Higher search placement", "Featured category card", "Priority support", "Monthly profile review"],
    cta: "Request featured plan",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "Rs 2,999/mo",
    description: "For serious businesses that want stronger lead generation.",
    features: ["Verified badge", "Premium profile placement", "Lead tracking setup", "Social promotion support"],
    cta: "Request premium plan",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-stone-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
            Vendor monetization
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-bold leading-tight">
            Earn money from paid vendor listings and wedding leads.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Start with manual payment collection through phone, UPI, or bank
            transfer. Add Razorpay payment links after you confirm demand.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-7 shadow-sm ${
                plan.highlighted
                  ? "border-emerald-900 bg-emerald-950 text-white"
                  : "border-slate-200 bg-white text-slate-950"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                {plan.highlighted && <Crown className="h-6 w-6 text-amber-300" />}
              </div>
              <p className={`mt-3 ${plan.highlighted ? "text-emerald-50" : "text-slate-600"}`}>
                {plan.description}
              </p>
              <p className="mt-8 text-4xl font-bold">{plan.price}</p>

              <div className="mt-8 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-3">
                    <Check className={`mt-0.5 h-5 w-5 ${plan.highlighted ? "text-amber-300" : "text-emerald-900"}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`mt-8 block rounded-lg px-5 py-3 text-center font-semibold ${
                  plan.highlighted
                    ? "bg-white text-emerald-950 hover:bg-amber-100"
                    : "bg-slate-950 text-white hover:bg-emerald-900"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Step icon={BadgeCheck} title="Verify vendors" body="Charge for verification after checking business identity, portfolio, and contact details." />
          <Step icon={Megaphone} title="Sell visibility" body="Place paid vendors higher in category pages, homepage blocks, and social media posts." />
          <Step icon={TrendingUp} title="Sell leads" body="When couples contact you for help, sell qualified enquiries to suitable vendors." />
        </div>
      </section>
    </main>
  );
}

function Step({
  icon: Icon,
  title,
  body,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-emerald-900" />
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>
    </div>
  );
}
