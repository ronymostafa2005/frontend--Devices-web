import { useState } from "react"
import toast from "react-hot-toast"
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from "react-icons/fa"

export default function HeaderContact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [sending, setSending] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Please fill in name, email, and message.")
            return
        }
        setSending(true)
        setTimeout(() => {
            setSending(false)
            toast.success("Message received! We’ll get back to you soon.")
            setName("")
            setEmail("")
            setSubject("")
            setMessage("")
        }, 600)
    }

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1))] shadow-[0_25px_80px_rgba(40,64,96,0.14)] backdrop-blur-sm sm:rounded-[38px]">
                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="border-b border-white/35 bg-white/15 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:border-white/35 lg:p-12">
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/35 px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-800">
                            <FaEnvelope className="text-sky-600" />
                            Contact
                        </div>
                        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Let’s build your next setup
                        </h1>
                        <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
                            Questions about an order, a device, or a partnership? Drop us a note — we read
                            every message.
                        </p>

                        <ul className="mt-10 space-y-5 text-sm">
                            <li className="flex gap-4 rounded-2xl border border-white/45 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                                    <FaEnvelope />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Email</p>
                                    <p className="font-semibold text-slate-800">hello@moderndevices.demo</p>
                                </div>
                            </li>
                            <li className="flex gap-4 rounded-2xl border border-white/45 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-700">
                                    <FaPhone />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Phone</p>
                                    <p className="font-semibold text-slate-800">+1 (555) 010‑2048</p>
                                </div>
                            </li>
                            <li className="flex gap-4 rounded-2xl border border-white/45 bg-white/20 p-4 backdrop-blur-sm">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-800">
                                    <FaMapMarkerAlt />
                                </span>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Studio</p>
                                    <p className="font-semibold text-slate-800">Remote-first · Earth</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 sm:p-10 lg:p-12">
                        <h2 className="text-lg font-bold text-slate-900">Send a message</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Demo form — connects to toast only (no mail server in this project).
                        </p>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                Name
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                                    placeholder="Your name"
                                />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                Email
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                                    placeholder="you@example.com"
                                />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                Subject
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                                    placeholder="Optional"
                                />
                            </label>
                            <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                Message
                                <textarea
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="mt-1.5 w-full resize-y rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
                                    placeholder="How can we help?"
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={sending}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:from-sky-600 hover:to-indigo-700 disabled:opacity-50 sm:w-auto sm:px-10"
                            >
                                <FaPaperPlane className="text-xs" />
                                {sending ? "Sending…" : "Send message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
