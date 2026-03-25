import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { FaMobileAlt, FaUserPlus } from "react-icons/fa"
import { useAuth } from "../../../context/AuthContext"

export default function Register() {
    const navigate = useNavigate()
    const location = useLocation()
    const { register, isAuthenticated } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const from = location.state?.from?.pathname || "/"

    if (isAuthenticated) {
        return (
            <section className="w-full">
                <div className="mx-auto max-w-md rounded-[28px] border border-white/45 bg-white/25 px-8 py-12 text-center backdrop-blur-md">
                    <p className="font-semibold text-slate-800">You are already signed in.</p>
                    <button
                        type="button"
                        onClick={() => navigate(from, { replace: true })}
                        className="mt-4 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white"
                    >
                        Continue
                    </button>
                </div>
            </section>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !password) {
            toast.error("Please fill in all fields.")
            return
        }
        if (name.trim().length < 3 || name.trim().length > 50) {
            toast.error("Name must be between 3 and 50 characters.")
            return
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.")
            return
        }
        if (password.length > 256) {
            toast.error("Password must be at most 256 characters.")
            return
        }
        if (password !== confirm) {
            toast.error("Passwords do not match.")
            return
        }
        setSubmitting(true)
        const r = await register({
            name: name.trim(),
            email: email.trim(),
            password,
        })
        setSubmitting(false)
        if (r.ok) {
            toast.success(r.message || "Account created!")
            navigate(from, { replace: true })
        } else {
            toast.error(r.message)
        }
    }

    return (
        <section className="w-full">
            <div className="mx-auto max-w-[460px] overflow-hidden rounded-[32px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.38),rgba(255,255,255,0.1))] shadow-[0_28px_80px_rgba(40,64,96,0.12)] backdrop-blur-md">
                <div className="border-b border-white/35 bg-white/15 px-8 py-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-800">
                        <FaUserPlus className="text-2xl" />
                    </div>
                    <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
                        Create account
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Join Modern Devices in seconds
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                        Full name
                        <input
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                            placeholder="Jane Doe"
                        />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                        Email
                        <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                            placeholder="you@example.com"
                        />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                        Password
                        <input
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                            placeholder="At least 8 characters"
                        />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                        Confirm password
                        <input
                            type="password"
                            autoComplete="new-password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                            placeholder="Repeat password"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:from-teal-600 hover:to-emerald-700 disabled:opacity-50"
                    >
                        {submitting ? "Creating account…" : "Register"}
                    </button>
                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            state={location.state}
                            className="font-bold text-emerald-700 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-700"
                    >
                        <FaMobileAlt />
                        Back to home
                    </Link>
                </form>
            </div>
        </section>
    )
}
