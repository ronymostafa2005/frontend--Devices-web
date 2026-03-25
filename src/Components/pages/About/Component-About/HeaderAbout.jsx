import { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { FaBolt, FaHeadphones, FaLeaf, FaRocket, FaShieldAlt } from "react-icons/fa"

const AboutHero3D = lazy(() => import("./AboutHero3D"))

const pillars = [
    {
        icon: FaBolt,
        title: "Smart performance",
        text: "Curated electronics and wearables chosen for reliable specs, efficient power use, and everyday speed.",
    },
    {
        icon: FaShieldAlt,
        title: "Trusted quality",
        text: "We focus on brands and devices that meet clear standards for safety, updates, and long-term support.",
    },
    {
        icon: FaLeaf,
        title: "Thoughtful design",
        text: "Minimal packaging where possible, repair-friendly categories, and a catalog built for clarity—not clutter.",
    },
]

export default function HeaderAbout() {
    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1))] shadow-[0_25px_80px_rgba(40,64,96,0.14)] backdrop-blur-sm sm:rounded-[38px]">
                <div className="border-b border-white/35 bg-white/15 px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
                    <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,440px)] lg:gap-12 xl:gap-16">
                        <div>
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/35 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
                                <FaHeadphones className="text-emerald-600" />
                                About Modern Devices
                            </div>
                            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                                We connect people with tech that feels{" "}
                                <span className="text-emerald-600">effortless</span>.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                                Modern Devices started as a simple idea: shopping for smart gear should be
                                calm, honest, and beautiful. Today we blend a clean storefront with real
                                product data so you always know what you are buying.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    to="/products"
                                    className="rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(5,150,105,0.35)] transition hover:bg-emerald-700"
                                >
                                    Browse catalog
                                </Link>
                                <Link
                                    to="/contact"
                                    className="rounded-full border-2 border-white/70 bg-white/40 px-8 py-3.5 text-sm font-bold text-slate-800 backdrop-blur-sm transition hover:bg-white/70"
                                >
                                    Talk to us
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
                            <div
                                className="relative aspect-square w-full min-h-[260px] overflow-hidden rounded-[28px] border border-white/55 bg-[linear-gradient(155deg,rgba(255,255,255,0.45),rgba(204,251,241,0.35),rgba(167,243,208,0.25))] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_20px_50px_rgba(15,118,110,0.12)] backdrop-blur-md sm:min-h-[300px] lg:min-h-[min(420px,48vh)]"
                                role="img"
                                aria-label="3D abstract headset illustration"
                            >
                                <Suspense
                                    fallback={
                                        <div
                                            className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/25 via-emerald-50/25 to-teal-100/35"
                                            aria-hidden
                                        />
                                    }
                                >
                                    <AboutHero3D />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-10 lg:gap-8 lg:p-12">
                    <div className="rounded-[22px] border border-white/50 bg-white/20 p-6 text-center backdrop-blur-md sm:p-8">
                        <p className="text-3xl font-black text-emerald-600 sm:text-4xl">24/7</p>
                        <p className="mt-2 text-sm font-semibold text-slate-700">Self-serve catalog</p>
                        <p className="mt-1 text-xs text-slate-500">Browse and filter anytime</p>
                    </div>
                    <div className="rounded-[22px] border border-white/50 bg-white/20 p-6 text-center backdrop-blur-md sm:p-8">
                        <p className="text-3xl font-black text-emerald-600 sm:text-4xl">100%</p>
                        <p className="mt-2 text-sm font-semibold text-slate-700">Live API data</p>
                        <p className="mt-1 text-xs text-slate-500">Prices & stock from our backend</p>
                    </div>
                    <div className="rounded-[22px] border border-white/50 bg-white/20 p-6 text-center backdrop-blur-md sm:col-span-1 sm:p-8">
                        <p className="text-3xl font-black text-emerald-600 sm:text-4xl">∞</p>
                        <p className="mt-2 text-sm font-semibold text-slate-700">Ideas in motion</p>
                        <p className="mt-1 text-xs text-slate-500">Built for learners & makers</p>
                    </div>
                </div>

                <div className="border-t border-white/30 bg-white/10 px-6 py-12 sm:px-10 lg:px-14">
                    <div className="mb-10 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-700">
                            <FaRocket className="text-lg" />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">What we stand for</h2>
                            <p className="text-sm text-slate-600">Three pillars behind every listing</p>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {pillars.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-[22px] border border-white/45 bg-[linear-gradient(160deg,rgba(255,255,255,0.45),rgba(255,255,255,0.08))] p-6 shadow-sm backdrop-blur-md transition hover:border-emerald-300/40"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                                    <Icon className="text-xl" />
                                </span>
                                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
