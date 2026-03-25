import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import gsap from "gsap"
import { FaMobileAlt, FaShoppingCart, FaSignOutAlt } from "react-icons/fa"
import { prefersReducedMotion } from "../animations/motionPrefs"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { cartItemCount } = useCart()
    const { user, isAuthenticated, logout, ready } = useAuth()
    const barRef = useRef(null)

    useLayoutEffect(() => {
        if (prefersReducedMotion()) return undefined
        const bar = barRef.current
        if (!bar) return undefined
        const blocks = bar.querySelectorAll("[data-nav-stagger]")
        if (!blocks.length) return undefined

        const ctx = gsap.context(() => {
            gsap.from(blocks, {
                opacity: 0,
                y: -16,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "opacity,transform",
            })
        }, bar)
        return () => ctx.revert()
    }, [])

    return (
        <nav className="px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6 xl:px-10">
            <div
                ref={barRef}
                className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 rounded-[28px] border border-white/40 bg-white/35 px-5 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-7 md:flex-row md:items-center md:justify-between xl:px-8"
            >
                <h3
                    data-nav-stagger
                    className="flex items-center gap-2 text-lg font-bold text-emerald-600 sm:text-2xl"
                >
                    <FaMobileAlt className="text-emerald-500" />
                    Modern Devices
                </h3>
                <ul
                    data-nav-stagger
                    className="flex flex-wrap items-center justify-center gap-1 rounded-full bg-white/40 px-2 py-2 text-sm font-medium text-slate-700 shadow-sm md:justify-end xl:gap-2"
                >
                    <li><Link to="/" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-emerald-600 sm:px-4">Home</Link></li>
                    <li><Link to="/about" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-emerald-600 sm:px-4">About</Link></li>
                    <li><Link to="/contact" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-emerald-600 sm:px-4">Contact</Link></li>
                    <li><Link to="/products" className="rounded-full px-3 py-2 transition hover:bg-white hover:text-emerald-600 sm:px-4">Products</Link></li>
                </ul>
                <div
                    data-nav-stagger
                    className="flex items-center justify-center gap-3 md:justify-end"
                >
                    <Link
                        to="/cart"
                        className="relative inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
                    >
                        <FaShoppingCart className="text-emerald-600" />
                        Cart
                        {cartItemCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                {cartItemCount > 99 ? "99+" : cartItemCount}
                            </span>
                        )}
                    </Link>
                    {!ready ? (
                        <span className="h-9 w-24 animate-pulse rounded-full bg-white/40" />
                    ) : isAuthenticated ? (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="max-w-[140px] truncate rounded-full border border-white/60 bg-white/50 px-4 py-2 text-xs font-semibold text-slate-700">
                                Hi, {user?.name?.split(" ")[0] || "there"}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    logout()
                                    toast.success("Signed out")
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Link
                                to="/login"
                                className="rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}