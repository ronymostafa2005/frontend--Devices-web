import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { FaLock, FaMobileAlt } from "react-icons/fa"
import { useAuth } from "../../../context/AuthContext"

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isAuthenticated } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
        if (!email.trim() || !password) {
            toast.error("Please enter email and password.")
            return
        }
        setSubmitting(true)
        const r = await login({ email: email.trim(), password })
        setSubmitting(false)
        if (r.ok) {
            toast.success(r.message || "Welcome back!")
            navigate(from, { replace: true })
        } else {
            toast.error(r.message)
        }
    }

    return (
        <section className="w-full">
            <div className="mx-auto max-w-[460px] overflow-hidden rounded-[32px] border border-white/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.38),rgba(255,255,255,0.1))] shadow-[0_28px_80px_rgba(40,64,96,0.12)] backdrop-blur-md">
                <div className="border-b border-white/35 bg-white/15 px-8 py-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-700">
                        <FaLock className="text-2xl" />
                    </div>
                    <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
                        Sign in
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Access your Modern Devices account
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
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
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                            placeholder="••••••••"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50"
                    >
                        {submitting ? "Signing in…" : "Login"}
                    </button>
                    <p className="text-center text-sm text-slate-600">
                        No account?{" "}
                        <Link
                            to="/register"
                            state={location.state}
                            className="font-bold text-emerald-700 hover:underline"
                        >
                            Create one
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
