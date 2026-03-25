import { Link } from "react-router-dom"
import { FaHeadphones } from "react-icons/fa"

export default function HeaderHomeLeft() {
    return (
        <div className="flex w-full max-w-[620px] flex-col justify-center lg:min-h-[520px] xl:min-h-[560px]">
            <div className="inline-flex items-center gap-3 text-sm font-semibold text-slate-900">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
                    <FaHeadphones className="text-sm" />
                </span>
                <span className="rounded-full border border-white/50 bg-white/35 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
                    Modern Devices — featured
                </span>
            </div>

            <div className="mt-10">
                <p className="max-w-md text-sm font-medium uppercase tracking-[0.28em] text-slate-600/80">
                    Premium sound experience
                </p>
                <h1 className="mt-4 text-[42px] font-light leading-[0.96] tracking-[-0.045em] text-slate-900 sm:text-[62px] lg:text-[68px] xl:text-[76px] 2xl:text-[84px]">
                    The Westmire
                </h1>
                <h2 className="mt-2 text-[42px] font-extrabold leading-[0.92] tracking-[-0.055em] text-slate-900 sm:text-[64px] lg:text-[72px] xl:text-[80px] 2xl:text-[88px]">
                    A56 Headset
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-700/85 sm:text-lg xl:max-w-2xl">
                    Balanced bass, clean vocals, and all-day comfort in a modern wireless design made for work, travel, and everyday listening.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                        to="/products"
                        className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(5,150,105,0.35)] transition hover:from-emerald-600 hover:to-teal-700"
                    >
                        Shop catalog
                    </Link>
                    <Link
                        to="/products"
                        className="rounded-full border-2 border-white/70 bg-white/50 px-8 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition hover:bg-white/80"
                    >
                        View all products
                    </Link>
                    <Link
                        to="/about"
                        className="rounded-full px-4 py-3.5 text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
                    >
                        Our story
                    </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-8 text-slate-700 xl:gap-10">
                    <div>
                        <p className="text-2xl font-bold text-slate-900">40h</p>
                        <p className="text-sm">Battery life</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">3D</p>
                        <p className="text-sm">Spatial sound</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">2yr</p>
                        <p className="text-sm">Warranty</p>
                    </div>
                </div>
            </div>
        </div>
    )
}