import { Link } from "react-router-dom"
import {
    FaArrowRight,
    FaBolt,
    FaDatabase,
    FaHeadphones,
    FaMobileAlt,
    FaShieldAlt,
    FaShoppingBag,
    FaTruck,
} from "react-icons/fa"

const highlights = [
    {
        icon: FaDatabase,
        word: "Fresh",
        title: "Real catalog, real numbers",
        hint: "Headsets, earbuds, and smart gear with prices and stock synced from our store API — nothing stale on the shelf.",
        iconWrap:
            "bg-gradient-to-br from-emerald-500/35 to-teal-600/25 text-emerald-900 ring-emerald-400/35",
        glow: "shadow-[0_12px_40px_rgba(16,185,129,0.15)]",
        wordClass:
            "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent",
    },
    {
        icon: FaMobileAlt,
        word: "Fluid",
        title: "Shop the way you scroll",
        hint: "Filters, search, hi-res galleries, and a cart that follows you — tuned for quick looks on your phone and deep dives on desktop.",
        iconWrap:
            "bg-gradient-to-br from-teal-400/35 to-cyan-500/25 text-teal-900 ring-teal-400/35",
        glow: "shadow-[0_12px_40px_rgba(20,184,166,0.14)]",
        wordClass:
            "bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent",
    },
    {
        icon: FaHeadphones,
        word: "Focused",
        title: "Sound & tech, front and center",
        hint: "Frosted glass panels and calm typography so specs, battery life, and that A56-style hero story stay easy to read and easy to trust.",
        iconWrap:
            "bg-gradient-to-br from-violet-400/30 to-indigo-500/25 text-violet-950 ring-violet-400/30",
        glow: "shadow-[0_12px_40px_rgba(139,92,246,0.12)]",
        wordClass:
            "bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent",
    },
]

const features = [
    {
        icon: FaShoppingBag,
        title: "Curated electronics",
        text: "From wireless headsets to everyday smart accessories — every listing is laid out so you can compare at a glance.",
    },
    {
        icon: FaBolt,
        title: "Lists that stay current",
        text: "Product grids refresh from the server so what you see matches what we can ship — ideal for flash sales and new drops.",
    },
    {
        icon: FaShieldAlt,
        title: "Your account, your cart",
        text: "Sign in to save your session securely; your bag is ready when you are, whether you are on the couch or at the desk.",
    },
    {
        icon: FaTruck,
        title: "Cart & saved items",
        text: 'Add to cart, move things to "save for later," and review totals in one glassy panel before you commit.',
    },
]

export default function HomeSections() {
    return (
        <div className="mt-10 space-y-10 sm:mt-14">
            <section className="overflow-hidden rounded-[32px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.34),rgba(255,255,255,0.12),rgba(204,251,241,0.2))] shadow-[0_28px_90px_rgba(40,64,96,0.12)] backdrop-blur-xl sm:rounded-[38px]">
                <div className="border-b border-white/35 bg-white/12 px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-800/80">
                        The Modern Devices difference
                    </p>
                    <h2 className="mx-auto mt-3 max-w-2xl text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Built for people who care how their tech{" "}
                        <span className="text-emerald-600">sounds &amp; feels</span>
                    </h2>
                </div>
                <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-10 lg:gap-8 lg:p-12">
                    {highlights.map((item) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={item.title}
                                className={`group relative flex flex-col items-center rounded-[24px] border border-white/55 bg-white/22 p-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl transition duration-300 hover:border-emerald-200/60 hover:bg-white/30 sm:p-8 ${item.glow}`}
                            >
                                <span
                                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ring-2 ring-inset ring-white/40 ${item.iconWrap} shadow-lg`}
                                >
                                    <Icon className="text-2xl" aria-hidden />
                                </span>
                                <p
                                    className={`text-3xl font-black tracking-tight sm:text-4xl ${item.wordClass}`}
                                >
                                    {item.word}
                                </p>
                                <p className="mt-3 text-base font-bold leading-snug text-slate-900">
                                    {item.title}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {item.hint}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] shadow-[0_25px_80px_rgba(40,64,96,0.1)] backdrop-blur-sm sm:rounded-[38px]">
                <div className="border-b border-white/30 bg-white/10 px-6 py-10 sm:px-10 lg:px-14">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-800">
                            <FaHeadphones className="text-xl" />
                        </span>
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                What you get in every aisle
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm text-slate-600 sm:text-base">
                                The same glass aesthetic as the rest of the site — tuned for browsing
                                audio gear and smart devices without the noise.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10 lg:gap-6 lg:p-12">
                    {features.map(({ icon: Icon, title, text }) => (
                        <article
                            key={title}
                            className="flex gap-4 rounded-[22px] border border-white/45 bg-white/18 p-6 backdrop-blur-md transition hover:border-emerald-200/60 hover:bg-white/25 sm:p-7"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-800">
                                <Icon className="text-lg" />
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {text}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="overflow-hidden rounded-[32px] border border-emerald-200/40 bg-[linear-gradient(125deg,rgba(16,185,129,0.18),rgba(45,212,191,0.12),rgba(255,255,255,0.35))] shadow-[0_28px_70px_rgba(5,150,105,0.18)] backdrop-blur-md sm:rounded-[38px]">
                <div className="flex flex-col items-start gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-14 lg:px-16">
                    <div className="max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-900/70">
                            Next step
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Ready to explore the catalog?
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-700">
                            Jump into products, save favorites to your cart, or create an account to
                            pick up where you left off on any device.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[200px]">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
                        >
                            Browse products
                            <FaArrowRight className="text-xs" />
                        </Link>
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center rounded-2xl border-2 border-white/80 bg-white/50 px-8 py-4 text-sm font-bold text-slate-800 backdrop-blur-sm transition hover:bg-white/80"
                        >
                            Create free account
                        </Link>
                        <Link
                            to="/contact"
                            className="text-center text-sm font-semibold text-emerald-800 underline-offset-2 hover:underline"
                        >
                            Questions? Contact us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
