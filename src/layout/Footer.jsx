import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { prefersReducedMotion } from "../animations/motionPrefs"
import {
    FaEnvelope,
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaMobileAlt,
    FaTwitter,
} from "react-icons/fa"

const footerLink =
    "text-sm font-medium text-slate-600 transition hover:text-emerald-700"

export default function Footer() {
    const year = new Date().getFullYear()
    const panelRef = useRef(null)

    useLayoutEffect(() => {
        if (prefersReducedMotion()) return undefined
        const panel = panelRef.current
        if (!panel) return undefined
        const blocks = panel.querySelectorAll("[data-footer-stagger]")
        if (!blocks.length) return undefined

        const ctx = gsap.context(() => {
            gsap.from(blocks, {
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.11,
                ease: "power2.out",
                clearProps: "opacity,transform",
            })
        }, panel)
        return () => ctx.revert()
    }, [])

    return (
        <footer className="mt-auto px-4 pb-6 pt-10 sm:px-6 lg:px-8 xl:px-10">
            <div
                ref={panelRef}
                className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[28px] border border-white/40 bg-white/30 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-md"
            >
                <div
                    data-footer-stagger
                    className="grid gap-10 border-b border-white/35 p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4 lg:gap-8 lg:p-12"
                >
                    <div className="lg:col-span-1">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-lg font-bold text-emerald-600"
                        >
                            <FaMobileAlt className="text-xl text-emerald-500" />
                            Modern Devices
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
                            Curated electronics and audio gear with a calm storefront, live
                            inventory, and a checkout flow built for clarity.
                        </p>
                        <a
                            href="mailto:hello@moderndevices.example"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                        >
                            <FaEnvelope className="text-emerald-600" />
                            hello@moderndevices.example
                        </a>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Shop
                        </h3>
                        <ul className="mt-4 flex flex-col gap-3">
                            <li>
                                <Link to="/products" className={footerLink}>
                                    All products
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className={footerLink}>
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Company
                        </h3>
                        <ul className="mt-4 flex flex-col gap-3">
                            <li>
                                <Link to="/about" className={footerLink}>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={footerLink}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Account
                        </h3>
                        <ul className="mt-4 flex flex-col gap-3">
                            <li>
                                <Link to="/login" className={footerLink}>
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className={footerLink}>
                                    Create account
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-6 flex gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/50 text-slate-600 transition hover:bg-white hover:text-emerald-600"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="text-sm" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/50 text-slate-600 transition hover:bg-white hover:text-emerald-600"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-sm" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/50 text-slate-600 transition hover:bg-white hover:text-emerald-600"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-sm" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/50 text-slate-600 transition hover:bg-white hover:text-emerald-600"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-sm" />
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    data-footer-stagger
                    className="flex flex-col items-center justify-between gap-4 px-8 py-6 sm:flex-row sm:px-10"
                >
                    <p className="text-center text-xs text-slate-500 sm:text-left">
                        © {year} Modern Devices. Demo storefront for learning — not a real
                        store.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-500">
                        <span className="rounded-full bg-white/40 px-3 py-1">
                            Secure browsing (HTTPS in production)
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
